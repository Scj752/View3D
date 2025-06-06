package com.example.demo;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Comment;
import com.example.demo.entity.Model;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.ModelRepository;
import com.example.demo.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Arrays;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	
}

// 开发环境初始化数据
@Component
@Profile("dev") // 仅在开发环境执行
@Slf4j
class DataInitializer implements CommandLineRunner {

	@Autowired
	private ModelRepository modelRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserService userService;

   	 @Override
	public void run(String... args) throws Exception {
		// delete all data
		userRepository.deleteAll();
		modelRepository.deleteAll();
		commentRepository.deleteAll();

		// user repository initialization
		User user1 = new User(null, "user1", "password1", "user1@example.com", LocalDateTime.now());
		User user2 = new User(null, "user2", "password2", "user2@example.com", LocalDateTime.now());

		userService.addUser(user1);
		userService.addUser(user2);

		// model repository initialization
		Model model1 = new Model(null, "Test Model 1", user1.getId(), "This is a test model",
            Arrays.asList("test", "model"), LocalDateTime.now(), 0, 0, 10.5,
                "https://placecats.com/300/200", "/models/607b5d65-d3b8-4696-8544-be75ac996c7f_2020_porsche_718_cayman_gt4.zip");
	    Model model2 = new Model(null, "Test Model 2", user2.getId(), "Another test model",
	    	Arrays.asList("test", "model2"), LocalDateTime.now(), 0, 0, 20.5,
	                "https://placecats.com/300/200", "/models/607b5d65-d3b8-4696-8544-be75ac996c7f_2020_porsche_718_cayman_gt4.zip");

	    modelRepository.save(model1);
	    modelRepository.save(model2);

	    // comment repository initialization
	    Comment comment1 = new Comment(null, model2.getId(), user1.getId(), "very good!", LocalDateTime.now());
	    Comment comment2 = new Comment(null, model1.getId(), user2.getId(), "Wonderful!", LocalDateTime.now());

	    commentRepository.save(comment1);
	    commentRepository.save(comment2);
	}
}