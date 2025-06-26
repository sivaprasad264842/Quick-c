package com.example.quickcloth.controllers;


import com.example.quickcloth.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    
    @PostMapping("/order")
    public ResponseEntity<Map<String, String>> createPaymentOrder(@RequestBody
    Map<String, Double> request) {
        try{
            String orderId = paymentService.createPaymentOrder(request.get("amount"));
            return ResponseEntity.ok(Map.of("create", orderId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
