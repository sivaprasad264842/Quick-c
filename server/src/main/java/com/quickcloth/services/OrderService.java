package com.quickcloth.services;

import com.quickcloth.models.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public Order placeOrder(Order order) {
        Order savedOrder = mongoTemplate.save(order);
        messagingTemplate.convertAndSend("/topic/orders/" + order.getUserId(), savedOrder);
        return savedOrder;
    }

    public void updateOrderStatus(String orderId, String status) {
        Order order = mongoTemplate.findById(orderId, Order.class);
        if (order != null) {
            order.setStatus(status);
            mongoTemplate.save(order);
            messagingTemplate.convertAndSend("/topic/orders/" + order.getUserId(), order);
        }
    }
}