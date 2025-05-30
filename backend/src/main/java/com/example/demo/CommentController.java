package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
	@Autowired
	private CommentService commentService;

	@GetMapping("/model/{modelId}")
	public List<Comment> getCommentsByModelId(@PathVariable String modelId) {
		return commentService.getCommentsByModelId(modelId);
	}

	@PostMapping
	public Comment createComment(@RequestBody Comment comment) {
		return commentService.saveComment(comment);
	}
}