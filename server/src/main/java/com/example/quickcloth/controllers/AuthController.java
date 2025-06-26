package com.example.quickcloth.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        return ResponseEntity.ok(Map.of("token", "mock-jwt-token"));
    }

    @PostMapping("/google/success")
    public ResponseEntity<Map<String, String>> googleSuccess() {
        return ResponseEntity.ok(Map.of("token", "mock-oauth-token"));
    }

    
}
