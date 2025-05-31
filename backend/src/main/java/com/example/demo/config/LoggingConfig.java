package com.example.demo.config;

import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import ch.qos.logback.classic.Level; 
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;
import ch.qos.logback.core.FileAppender;
import ch.qos.logback.core.rolling.RollingFileAppender;
import ch.qos.logback.core.rolling.TimeBasedRollingPolicy;

@Configuration
public class LoggingConfig {

    @Bean
    public LoggerContext loggerContext() {
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
        context.reset(); // 清除默认配置
        
        // 创建控制台输出
        ConsoleAppender<ILoggingEvent> consoleAppender = createConsoleAppender(context);
        
        // 创建文件输出
        FileAppender<ILoggingEvent> fileAppender = createFileAppender(context);
        
        // 配置根 logger
        ch.qos.logback.classic.Logger rootLogger = context.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(consoleAppender);
        rootLogger.addAppender(fileAppender);
        rootLogger.setLevel(ch.qos.logback.classic.Level.INFO);

        // 设置特定包的日志级别
        context.getLogger("com.example.controller").setLevel(Level.DEBUG);
        context.getLogger("com.example.service").setLevel(Level.INFO);
        
        return context;
    }
    
    private ConsoleAppender<ILoggingEvent> createConsoleAppender(LoggerContext context) {
        ConsoleAppender<ILoggingEvent> appender = new ConsoleAppender<>();
        appender.setContext(context);
        appender.setEncoder(createPatternEncoder(context));
        appender.start();
        return appender;
    }
    
    private FileAppender<ILoggingEvent> createFileAppender(LoggerContext context) {
        RollingFileAppender<ILoggingEvent> appender = new RollingFileAppender<>();
        appender.setContext(context);
        appender.setFile("logs/application.log");
        appender.setEncoder(createPatternEncoder(context));
        
        // 配置滚动策略（按天分割）
        TimeBasedRollingPolicy<ILoggingEvent> rollingPolicy = new TimeBasedRollingPolicy<>();
        rollingPolicy.setContext(context);
        rollingPolicy.setParent(appender);
        rollingPolicy.setFileNamePattern("logs/application.%d{yyyy-MM-dd}.log");
        rollingPolicy.setMaxHistory(30);
        rollingPolicy.start();
        
        appender.setRollingPolicy(rollingPolicy);
        appender.start();
        return appender;
    }
    
    private PatternLayoutEncoder createPatternEncoder(LoggerContext context) {
        PatternLayoutEncoder encoder = new PatternLayoutEncoder();
        encoder.setContext(context);
        encoder.setPattern("%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n");
        encoder.start();
        return encoder;
    }
}