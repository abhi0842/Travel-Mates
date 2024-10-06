package com.example.TravelMates.repository;

import com.example.TravelMates.model.Experience;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ExperienceRepository extends MongoRepository<Experience, String> {
    // Custom queries if needed
}