package com.quickcloth.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private final String id;
    private final String name;
    private final double price;
    private final List<String> images;

    public Product(String id, String name, double price, List<String> images) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.images = images;
    }

    public double getPrice() {
        return price;
    }

    public List<String> getImages() {
        return images;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}