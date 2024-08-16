package com.example.userservice.service;

import com.example.userservice.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User saveUser(User user);
    User getUserByUsername(String username);
}
