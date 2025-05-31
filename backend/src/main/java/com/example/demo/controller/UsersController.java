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

@RestController
@RequestMapping("/api/users")
@Tag(name = "用户管理", description = "用户的增删改查接口")
public class UsersController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    @Operation(summary = "获取用户信息", description = "根据用户ID获取详细信息")
    public ResponseEntity<?> getUser(
        @Parameter(description = "用户ID", required = true)
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
        @Parameter(description = "用户名", required = true)
        @RequestParam("username") String username,
        @Parameter(description = "用户密码", required = true)
        @RequestParam("password") String password,
        @Parameter(description = "用户邮件地址", required = true)
        @RequestParam("email") String email) {
        Optional<User> existingUser = userService.getUserByName(username);
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User newUser = new User(null, username, password, email, LocalDateTime.now());
        userService.addUser(newUser);
        return ResponseEntity.ok("add user successful");
    }
}