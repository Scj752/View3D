package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 关闭 CSRF（若为前后端分离项目）
            .csrf(csrf -> csrf.disable())
            // 授权配置
            .authorizeHttpRequests(authz -> authz
                //允许公开路径（Ant 模式示例）
                .requestMatchers(
                    "/api/public/**", 
                    "/swagger-ui/**", 
                    "/v3/api-docs/**"
                ).permitAll()
                // 其他路径需认证
                .anyRequest().authenticated()
            )
            //启用 HTTP Basic 认证（可选）
            .httpBasic(basic -> basic   // 自定义认证入口
                .realmName("MyApp")  // 可选：设置 Realm 名称
            );

        return http.build();
    }
}