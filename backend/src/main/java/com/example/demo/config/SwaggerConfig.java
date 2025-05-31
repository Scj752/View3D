package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("3D模型网站API文档")
                .version("1.0.0")
                .description("3D模型网站后端API接口文档")
                .termsOfService("http://example.com/terms")
                .license(new License().name("MIT License").url("http://example.com/license"))
            );
    }
}