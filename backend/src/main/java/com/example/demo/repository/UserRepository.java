package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

import com.example.demo.entity.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}