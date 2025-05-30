package com.example.demo.entity;

import lombok.*;

import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private Date createdAt;
}
