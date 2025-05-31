package com.example.demo.entity;

import lombok.*;

import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
	@Id
	private String id;
	private String modelId;
	private String userId;
	private String content;
	private LocalDateTime createdAt;
}