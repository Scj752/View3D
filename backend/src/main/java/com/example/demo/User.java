package com.example.demo;

import lombok.*;

import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class User {

    @Id
    private String id;
    private String username;
    private String password;
    private String email;
    private Date createdAt;
    private Date updatedAt;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }

}
