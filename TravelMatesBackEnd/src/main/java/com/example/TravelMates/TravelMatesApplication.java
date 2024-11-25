package com.example.TravelMates;

import com.example.TravelMates.model.Destination;
import com.example.TravelMates.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TravelMatesApplication implements CommandLineRunner {

	@Autowired
	private DestinationRepository destinationRepository;

	public static void main(String[] args) {
		SpringApplication.run(TravelMatesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Destination destination = new Destination("Goa", "Img", 9.0);
		Destination destination2 = new Destination("Delhi", "Img1", 8.0);
		Destination destination3 = new Destination("keral", "Img2", 8.5);
		// Clear existing destinations

		destinationRepository.deleteAll();

		// Save new destinations
		destinationRepository.save(destination);
		destinationRepository.save(destination2);

		// Retrieve and print all destinations
		System.out.println("All destinations:");
		destinationRepository.findAll().forEach(System.out::println);
	}
}
