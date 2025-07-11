package com.quickcloth.controllers;

import com.quickcloth.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping
    public Cart addToCart(@RequestBody Cart item) {
        return mongoTemplate.save(item);
    }

    @GetMapping
    public List<Cart> getCart() {
        return mongoTemplate.findAll(Cart.class);
    }

    @PutMapping("/{productId}")
    public Cart updateCart(@PathVariable String productId, @RequestBody Cart item) {
        Cart existing = mongoTemplate.findById(productId, Cart.class);
        if (existing != null) {
            existing.setQuantity(item.getQuantity());
            return mongoTemplate.save(existing);
        }
        return null;
    }

    @DeleteMapping("/{productId}")
    public void removeFromCart(@PathVariable String productId) {
        mongoTemplate.remove(new org.springframework.data.mongodb.core.query.Query(
            org.springframework.data.mongodb.core.query.Criteria.where("productId").is(productId)), Cart.class);
    }
}