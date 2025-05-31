package com.example.demo.service;

import com.example.demo.entity.Model;
import com.example.demo.repository.ModelRepository;
import com.example.demo.dto.ModelUploadRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public abstract class ModelService {

    @Autowired
    protected ModelRepository modelRepository;


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

    public List<Model> getModelsByTag(String tag) {
        return modelRepository.findByTagsContaining(tag);
    }

    // 抽象方法：由子类实现具体上传逻辑
    public abstract Model uploadModel(ModelUploadRequest request);
    
    // 模板方法：定义上传后的通用处理逻辑
    protected Model processUploadedModel(Model model) {
        model.setUploadedAt(LocalDateTime.now());
        model.setLikes(0);
        model.setDownloads(0);
        return modelRepository.save(model);
    }

    public abstract Resource loadFileAsResource(String fileKey);

    public abstract String getFilename(String fileKey);
}