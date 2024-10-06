package com.example.TravelMates.controller;

import com.example.TravelMates.model.Destination;
import com.example.TravelMates.model.Experience;
import com.example.TravelMates.model.Message;
import com.example.TravelMates.model.Traveler;
import com.example.TravelMates.services.DestinationService;
import com.example.TravelMates.services.ExperienceService;
import com.example.TravelMates.services.MessageService;
import com.example.TravelMates.services.TravelerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TravelConnectController {
    @Autowired
    private TravelerService travelerService;
    @Autowired
    private MessageService messageService;
    @Autowired
    private DestinationService destinationService;
    @Autowired
    private ExperienceService experienceService;

    @GetMapping("/nearby-travelers")
    public List<Traveler> getNearbyTravelers(@RequestParam double latitude, @RequestParam double longitude, @RequestParam double maxDistance) {
        return travelerService.getNearbyTravelers(latitude, longitude, maxDistance);
    }

    @GetMapping("/messages/{userId}")
    public List<Message> getMessages(@PathVariable String userId) {
        return messageService.getMessagesByUserId(userId);
    }

    @PostMapping("/messages")
    public Message sendMessage(@RequestBody Message message) {
        return messageService.sendMessage(message);
    }

    @GetMapping("/popular-destinations")
    public List<Destination> getPopularDestinations() {
        return destinationService.getPopularDestinations();
    }

    @GetMapping("/travel-experiences")
    public List<Experience> getTravelExperiences() {
        return experienceService.getTravelExperiences();
    }

    @PostMapping("/travel-experiences")
    public Experience shareExperience(@RequestBody Experience experience) {
        return experienceService.shareExperience(experience);
    }
}