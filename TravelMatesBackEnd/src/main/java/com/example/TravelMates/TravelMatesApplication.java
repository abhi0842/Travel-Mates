package com.example.TravelMates;

import com.example.TravelMates.model.Traveler;
import com.example.TravelMates.repository.TravelerRepository;
import com.example.TravelMates.services.TravelerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class TravelMatesApplication {
	@Autowired
	private TravelerService travelerService;


	public static void main(String[] args) {
		SpringApplication.run(TravelMatesApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner() {
		return args -> {

//			Traveler newTraveler = new Traveler(
//					"John Doe",
//					"New York City",
//					"https://example.com/avatar.jpg",
//					40.7128,
//					-74.0060
//			);
//			Traveler savedTraveler = travelerService.createTraveler(newTraveler);
//
//			System.out.println("New traveler added with ID: " + savedTraveler.getId());
//
//			Traveler anotherTraveler = new Traveler(
//					"Jane Smith",
//					"San Francisco",
//					"https://example.com/jane-avatar.jpg",
//					37.7749,
//					-122.4194
//			);
//			Traveler savedAnotherTraveler = travelerService.createTraveler(anotherTraveler);
//			System.out.println("Another traveler added with ID: " + savedAnotherTraveler.getId());
//
//			System.out.println("All travelers:");
//			travelerService.getAllTravelers().forEach(traveler ->
//					System.out.println(traveler.getName() + " - " + traveler.getLocation())
//			);
//		};
		};
	}

}
