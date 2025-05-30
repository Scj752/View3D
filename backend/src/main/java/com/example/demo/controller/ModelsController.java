package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
public class ModelsController {
    @Autowired
    private ModelService modelService;

    @GetMapping("/{id}")
    public ResponseEntity<Model> getModel(@PathVariable String id) {
        Model model = modelService.getModelById(id);
        if (model != null) {
            return ResponseEntity.ok(model);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    @PostMapping
    public ResponseEntity<Model> createModel(@RequestBody Model model) {
        Model savedModel = modelService.saveModel(model);
        return ResponseEntity.ok(savedModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable String id) {
        modelService.deleteModel(id);
        return ResponseEntity.noContent().build();
    }
}