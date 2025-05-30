package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ModelService {
    @Autowired
    private ModelRepository modelRepository;

    public Model getModelById(String id) {
        return modelRepository.findById(id).orElse(null);
    }

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public Model saveModel(Model model) {
        return modelRepository.save(model);
    }

    public void deleteModel(String id) {
        modelRepository.deleteById(id);
    }
}
