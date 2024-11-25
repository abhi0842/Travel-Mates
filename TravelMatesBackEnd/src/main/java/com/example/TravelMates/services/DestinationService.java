package com.example.TravelMates.services;

import com.example.TravelMates.model.Destination;
import com.example.TravelMates.repository.DestinationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DestinationService {
    @Autowired
    private DestinationRepository destinationRepository;

    public List<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Optional<Destination> getDestinationById(String id) {
        return destinationRepository.findById(id);
    }

    public List<Destination> getPopularDestinations() {
        // update this funcnality later

        return destinationRepository.findAll();
    }

    public Destination createDestination(Destination destination) {
        return destinationRepository.save(destination);
    }

    public Destination updateDestination(String id, Destination destinationDetails) {
        Optional<Destination> destination = destinationRepository.findById(id);
        if (destination.isPresent()) {
            Destination existingDestination = destination.get();
            existingDestination.setName(destinationDetails.getName());
            existingDestination.setImage(destinationDetails.getImage());
            existingDestination.setRating(destinationDetails.getRating());
            return destinationRepository.save(existingDestination);
        }
        return null;
    }

    public void deleteDestination(String id) {
        destinationRepository.deleteById(id);
    }
}