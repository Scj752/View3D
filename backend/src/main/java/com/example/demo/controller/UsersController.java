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

import java.time.LocalDateTime;
import java.util.Optional;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.dto.UserAddRequest;

@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理", description = "用户的增删改查接口")
public class UsersController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @Operation(summary = "获取用户信息", description = "根据用户 ID 获取详细信息")
    public ResponseEntity<?> getUser(
        @Parameter(description = "用户 ID", required = true)
        @PathVariable String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    @Operation(summary = "添加用户", description = "添加一个新用户")
    public ResponseEntity<String> addUser(
        @Parameter(description = "添加用户请求", required = true)
        @RequestBody UserAddRequest request) {
        Optional<User> existingUser = userService.getUserByName(request.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User newUser = new User(null, request.getUsername(), request.getPassword(), request.getEmail(), LocalDateTime.now());
        userService.addUser(newUser);
        return ResponseEntity.ok("add user successful");
    }
}