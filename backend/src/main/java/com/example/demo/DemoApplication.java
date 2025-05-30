package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Autowired
	private ModelRepository modelRepository;
	@Autowired
	private UserRepository userRepository;

	@Override
	public void run(String... args) throws Exception {
		modelRepository.deleteAll();

		// save a couple of models
		modelRepository.save(new Model("Model1", "Author1", "Description1", "http://example.com/image1.jpg"));
		modelRepository.save(new Model("Model2", "Author2", "Description2", "http://example.com/image2.jpg"));
		modelRepository.save(new Model("Model3", "Author1", "Description3", "http://example.com/image3.jpg"));

		// fetch all models
		System.out.println("Models found with findAll():");
		System.out.println("-------------------------------");
		for (Model model : modelRepository.findAll()) {
			System.out.println(model);
		}
		System.out.println();

		// fetch an individual model
		System.out.println("Model found with findByName('Model1'):");
		System.out.println("--------------------------------");
		System.out.println(modelRepository.findByName("Model1"));

		// fetch models by author
		System.out.println("Models found with findByAuthor('Author1'):");
		System.out.println("--------------------------------");
		for (Model model : modelRepository.findByAuthor("Author1")) {
			System.out.println(model);
		}
		System.out.println();

		userRepository.deleteAll();
		// save a couple of users
		userRepository.save(new User("Author1", "Password1", "author1@example.com"));
		userRepository.save(new User("Author2", "Password2", "author2@example.com"));

		// fetch all users
		System.out.println("Users found with findAll():");
		System.out.println("-------------------------------");
		for (User user : userRepository.findAll()) {
			System.out.println(user);
		}
		System.out.println();

		// fetch an individual user
		System.out.println("User found with findByUsername('Author1'):");
		System.out.println("--------------------------------");
		System.out.println(userRepository.findByUsername("Author1"));

		// fetch users by email
		System.out.println("User found with findByEmail('author2@example.com')");
		System.out.println("-------------------------------");
		System.out.println(userRepository.findByEmail("author2@example.com"));
		System.out.println();
	}
}
