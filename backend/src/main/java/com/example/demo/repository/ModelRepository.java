package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import com.example.demo.entity.Model;

public interface ModelRepository extends MongoRepository<Model, String> {
    List<Model> findByTagsContaining(String tag);
}