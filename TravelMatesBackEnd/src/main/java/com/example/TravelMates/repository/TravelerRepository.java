package com.example.TravelMates.repository;

import com.example.TravelMates.model.Traveler;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface TravelerRepository extends MongoRepository<Traveler, String> {
    // Custom queries if needed
}
