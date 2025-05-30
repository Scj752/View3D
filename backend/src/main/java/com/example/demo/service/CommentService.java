package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getCommentsByModelId(String modelId) {
        return commentRepository.findByModelId(modelId);
    }

    public Comment saveComment(Comment comment) {
        return commentRepository.save(comment);
    }
}