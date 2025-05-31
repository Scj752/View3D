package com.example.demo.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void getUserById() {
        String userId = "123";
        Optional<User> userOptional = Optional.of(new User());
        when(userRepository.findById(userId)).thenReturn(userOptional);

        Optional<User> result = userService.getUserById(userId);

        assertEquals(userOptional.get(), result.get());
    }

    @Test
    void getUserByName() {
        String username = "Bob";
        Optional<User> userOptional = Optional.of(new User());
        when(userRepository.findByUsername(username)).thenReturn(userOptional);

        Optional<User> result = userService.getUserByName(username);

        assertEquals(userOptional.get(), result.get());
    }

    @Test
    void addUser() {
        User user = new User();
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.addUser(user);

        assertEquals(user, result);
    }
}