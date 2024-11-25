package com.example.TravelMates.services;

import com.example.TravelMates.model.Traveler;
import com.example.TravelMates.repository.TravelerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TravelerService {
    @Autowired
    private TravelerRepository travelerRepository;

    public List<Traveler> getAllTravelers() {
        return travelerRepository.findAll();
    }

    public Optional<Traveler> getTravelerById(String id) {
        return travelerRepository.findById(id);
    }

    public List<Traveler> getNearbyTravelers(double latitude, double longitude, double maxDistance) {
        return travelerRepository.findAll();
    }

    public Traveler createTraveler(Traveler traveler) {
        return travelerRepository.save(traveler);
    }

    public Traveler updateTraveler(String id, Traveler travelerDetails) {
        Optional<Traveler> traveler = travelerRepository.findById(id);
        if (traveler.isPresent()) {
            Traveler existingTraveler = traveler.get();
            existingTraveler.setName(travelerDetails.getName());
            existingTraveler.setLocation(travelerDetails.getLocation());
            existingTraveler.setAvatar(travelerDetails.getAvatar());
            existingTraveler.setLatitude(travelerDetails.getLatitude());
            existingTraveler.setLongitude(travelerDetails.getLongitude());
            return travelerRepository.save(existingTraveler);
        }
        return null;
    }

    public void deleteTraveler(String id) {
        travelerRepository.deleteById(id);
    }
}