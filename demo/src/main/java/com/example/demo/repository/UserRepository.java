package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user for login verification
    Optional<User> findByEmailAndPassword(String email, String password);

    // Check if email or username already exists during registration
    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
