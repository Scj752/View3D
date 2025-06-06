package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
                // 允许公开路径（Ant 模式示例）
               .requestMatchers(
                    "/api/auth/login", // 登录接口公开
                    "/api/users/add",  // 注册接口公开
                    "/api/models/**",
                    "/swagger-ui/**", 
                    "/v3/api-docs/**"
                ).permitAll()
                // 评论和模型相关 API 需要认证
               .requestMatchers("/api/comments/**").authenticated()
                // 其他路径需认证
               .anyRequest().authenticated()
            )
            // 启用 JWT 认证
           .httpBasic(basic -> basic.disable())
           .formLogin(form -> form.disable())
           .exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, authException) -> {
                response.sendError(401, "Unauthorized");
            }));

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}