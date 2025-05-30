package com.example.demo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ModelRepository extends MongoRepository<Model, String> {
    Model findByName(String name);
    List<Model> findByAuthor(String author);
}
