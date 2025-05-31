package com.example.demo.dto;

import lombok.Data;

@Data
public class UserAddRequest {
	private String username;
	private String password;
	private String email;
}