package com.example.TravelMates.repository;


import com.example.TravelMates.model.Message;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessageRepository extends MongoRepository<Message, String> {
    // Custom queries if needed
}