package com.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Comment;
import com.example.demo.service.CommentService;

@RestController
@RequestMapping("/api/comments")
@Tag(name = "评论管理", description = "模型评论的增删改查接口")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/model/{modelId}")
    @Operation(summary = "获取模型评论", description = "根据模型ID获取所有评论")
    public ResponseEntity<?> getCommentsByModelId(
        @Parameter(description = "模型ID", required = true)
        @PathVariable String modelId) {
        List<Comment> comments = commentService.getCommentsByModelId(modelId);
        if (comments != null) {
            return ResponseEntity.ok(comments);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    @Operation(summary = "添加评论", description = "为指定模型添加新评论")
    public ResponseEntity<Comment> createComment(
        @Parameter(description = "评论内容", required = true)
        @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.saveComment(comment));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
        @Parameter(description = "评论ID", required = true)
        @PathVariable String commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}