package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ModelsController {

    private final ModelRepository modelRepository;

    public ModelsController(ModelRepository modelRepository) {
        this.modelRepository = modelRepository;
    }

    @PostMapping("/api/models/upload")
    public ResponseEntity<String> uploadModel(
            @RequestParam("name") String name,
            @RequestParam("author") String author,
            @RequestParam("description") String description,
            @RequestParam("imageUrl") String imageUrl) {
        Model model = new Model(name, author, description, imageUrl);
        modelRepository.save(model);
        return ResponseEntity.ok("Model uploaded successfully");
    }

    @GetMapping("/api/models/all")
    public ResponseEntity<List<Model>> getAllModels() {
        List<Model> models = modelRepository.findAll();
        return ResponseEntity.ok(models);
    }

    @GetMapping("/api/models/author")
    public ResponseEntity<List<Model>> getModelsByAuthor(@RequestParam("author") String author) {
        List<Model> models = modelRepository.findByAuthor(author);
        return ResponseEntity.ok(models);
    }

    @GetMapping("/api/models/name")
    public ResponseEntity<Model> getModelByName(@RequestParam("name") String name) {
        Model model = modelRepository.findByName(name);
        return ResponseEntity.ok(model);
    }

    @GetMapping("/api/models/delete")
    public ResponseEntity<String> deleteModel(@RequestParam("id") String id) {
        modelRepository.deleteById(id);
        return ResponseEntity.ok("Model deleted successfully");
    }
}
