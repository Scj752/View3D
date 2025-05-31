package com.example.demo.entity;

import lombok.*;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private LocalDateTime createdAt;
}
