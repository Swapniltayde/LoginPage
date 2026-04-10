package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) throws Exception {
        // Basic Validations
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new Exception("Email cannot be empty");
        }
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new Exception("Username cannot be empty");
        }
        if (user.getPassword() == null || user.getPassword().length() < 5) {
            throw new Exception("Password must be at least 5 characters long");
        }

        // Uniquness Verification
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new Exception("Email already exists!");
        }
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new Exception("Username already exists!");
        }

        // Save the User
        return userRepository.save(user);
    }

    public User authenticateUser(String email, String password) throws Exception {
        Optional<User> optionalUser = userRepository.findByEmailAndPassword(email, password);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new Exception("Invalid email or password!");
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
