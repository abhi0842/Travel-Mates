package com.example.TravelMates.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "destinations")
public class Destination {
    @Id
    private String id;
    private String name;
    private String image;
    private double  rating;

    // Constructors
    public Destination() {}

    public Destination(String name, String image, double  rating) {
        this.name = name;
        this.image = image;
        this.rating = rating;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
    @Override
    public String toString() {
        return "Destination{" +
                "name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", rating=" + rating +
                '}';
    }
}
