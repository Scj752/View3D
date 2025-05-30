package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsersController {

    // Add authentication methods here
    // For example, login, register, etc.
    // You can use Spring Security for authentication and authorization
    // Implement JWT or session-based authentication as per your requirement

    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Example method for user logout
    @PostMapping("/api/users/add")
    public ResponseEntity<String> addUser(@RequestParam("username") String username,
                                      @RequestParam("password") String password,
                                      @RequestParam("email") String email) {
        // Implement logout logic here
        userRepository.save(new User(username, password, email));
        return ResponseEntity.ok("add user successful");
    }

    @GetMapping("/api/users/all")
    public ResponseEntity<List<User>> getUsers() {
        // Implement logic to get authors here
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/api/users/username")
    public ResponseEntity<User> getUser(@RequestParam("username") String username) {
        // Implement logic to get author by username here
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/api/users/delete")
    public ResponseEntity<String> deleteUser(@RequestParam("id") String id) {
        // Implement logic to delete user here
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
