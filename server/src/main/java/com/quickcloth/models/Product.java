package com.quickcloth.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private double price;
    private List<String> images;

    public Product(String id, String name, double price, List<String> images) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.images = images;
    }
}