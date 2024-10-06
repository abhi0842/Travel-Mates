package com.example.TravelMates.repository;

import com.example.TravelMates.model.Destination;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DestinationRepository extends MongoRepository<Destination, String> {
    // Custom queries if needed
}