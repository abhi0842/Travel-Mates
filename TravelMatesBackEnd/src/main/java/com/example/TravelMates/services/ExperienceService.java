package com.example.TravelMates.services;


import com.example.TravelMates.model.Experience;
import com.example.TravelMates.repository.ExperienceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ExperienceService {
    @Autowired
    private ExperienceRepository experienceRepository;

    public List<Experience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    public Optional<Experience> getExperienceById(String id) {
        return experienceRepository.findById(id);
    }

    public Experience createExperience(Experience experience) {
        return experienceRepository.save(experience);
    }

    public Experience updateExperience(String id, Experience experienceDetails) {
        Optional<Experience> experience = experienceRepository.findById(id);
        if (experience.isPresent()) {
            Experience existingExperience = experience.get();
            existingExperience.setUserId(experienceDetails.getUserId());
            existingExperience.setDestination(experienceDetails.getDestination());
            existingExperience.setContent(experienceDetails.getContent());
            existingExperience.setCreatedAt(experienceDetails.getCreatedAt());
            return experienceRepository.save(existingExperience);
        }
        return null;
    }

    public void deleteExperience(String id) {
        experienceRepository.deleteById(id);
    }

    public Experience shareExperience(Experience experience) {
        return createExperience(experience);
    }

    // Add this method to resolve the 'getTravelExperiences' issue
    public List<Experience> getTravelExperiences() {
        return getAllExperiences();
    }
}