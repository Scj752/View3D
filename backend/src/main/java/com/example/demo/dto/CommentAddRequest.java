package com.example.demo.dto;

import lombok.Data;

@Data
public class CommentAddRequest {
	private String modelId;
	private String userId;
	private String content;
}