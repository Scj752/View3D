package com.example.demo.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.example.demo.entity.Model;
import com.example.demo.repository.ModelRepository;

@ExtendWith(MockitoExtension.class)
class ModelServiceTest {

    @Mock
    private ModelRepository modelRepository;

    @InjectMocks
    private ModelService modelService;

    @Test
    void getModelById() {
        String modelId = "123";
        Optional<Model> modelOptional = Optional.of(new Model());

        when(modelRepository.findById(modelId)).thenReturn(modelOptional);

        Model result = modelService.getModelById(modelId);

        assertEquals(modelOptional.get(), result);
    }

    @Test
    void getAllModels() {
        List<Model> models = new ArrayList<>();

        when(modelRepository.findAll()).thenReturn(models);

        List<Model> result = modelService.getAllModels();

        assertEquals(models, result);
    }

    @Test
    void saveModel() {
        Model model = new Model();

        when(modelRepository.save(model)).thenReturn(model);

        Model result = modelService.saveModel(model);

        assertEquals(model, result);
    }

    @Test
    void getModelsByTag() {
        String tag = "tag";
        List<Model> models = new ArrayList<>();

        when(modelRepository.findByTagsContaining(tag)).thenReturn(models);

        List<Model> result = modelService.getModelsByTag(tag);

        assertEquals(models, result);
    }
}