package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RestController
@RequestMapping("/api/models")
public class ModelsController {
    @Autowired
    private ModelService

    @GetMapping("/{id}")
    public Model getModel(@PathVariable String) {
        return model.Service.getModelById(id);
    }

    @GetMapping
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    @PostMapping
    public Model createModel(@RequestBody Model model) {
        return modelService.saveModel(model);
    }

    @DeleteMapping("/{id}")
    public void deleteModel(@PathVariable String id) {
        modelService.deleteModel(id);
    }
}