package com.quickcloth.controllers;

import com.quickcloth.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping
    public List<Product> getProducts() {
        return mongoTemplate.findAll(Product.class);
    }

    @GetMapping("/seed")
    public String seedProducts() {
        mongoTemplate.insert(new Product("1", "T-Shirt", 499.00, List.of("tshirt1.jpg", "tshirt2.jpg")));
        mongoTemplate.insert(new Product("2", "Jeans", 999.00, List.of("jeans1.jpg", "jeans2.jpg")));
        return "Products seeded";
    }
}