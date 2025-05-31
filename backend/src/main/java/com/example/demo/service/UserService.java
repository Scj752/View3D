package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public Optional<User> getUserById(String id) {
		return userRepository.findById(id);
	}

	public Optional<User> getUserByName(String username) {
		return userRepository.findByUsername(username);
	}

	public User addUser(User user) {
		return userRepository.save(user);
	}

}