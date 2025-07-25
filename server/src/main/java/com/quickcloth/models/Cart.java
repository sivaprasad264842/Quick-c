package com.quickcloth.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "cart")
public class Cart {
    @Id
    private String productId;
    private String name;
    private double price;
    private int quantity;

    // Explicit getters and setters to resolve missing method errors
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}