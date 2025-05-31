package com.example.demo.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @Test
    void getCommentsByModelId() {
        String modelId = "123";
        List<Comment> comments = new ArrayList<>();
        when(commentRepository.findByModelId(modelId)).thenReturn(comments);

        List<Comment> result = commentService.getCommentsByModelId(modelId);

        assertEquals(comments, result);
    }

    @Test
    void saveComment() {
        Comment comment = new Comment();
        when(commentRepository.save(comment)).thenReturn(comment);

        Comment result = commentService.saveComment(comment);

        assertEquals(comment, result);
    }
}