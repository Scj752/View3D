package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.entity.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {
	List<Comment> findByModelId(String modelId);
}