package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.util.List;

import com.example.demo.entity.Model;
import com.example.demo.repository.ModelRepository;
import com.example.demo.service.ModelService;
import com.example.demo.service.FileStorageService;
import com.example.demo.dto.ModelUploadRequest;

@Service
public class ModelServiceImpl extends ModelService {
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @Override
    public Model uploadModel(ModelUploadRequest request) {
        try {
            // 存储缩略图
            String thumbnailPath = fileStorageService.storeFile(
                request.getThumbnail(), "thumbnails");
            
            // 存储模型文件
            String modelFilePath = fileStorageService.storeFile(
                request.getModelFile(), "models");
            
            // 创建模型实体
            Model model = new Model();
            model.setName(request.getName());
            model.setCreatorId(request.getCreatorId());
            model.setDescription(request.getDescription());
            model.setTags(request.getTags());
            model.setFileSize(request.getFileSize());
            model.setThumbnailUrl(thumbnailPath);
            model.setFilePath(modelFilePath);
            
            // 调用基类的通用处理逻辑
            return processUploadedModel(model);
            
        } catch (Exception e) {
            throw new RuntimeException("文件上传失败", e);
        }
    }

    @Override
    public Resource loadFileAsResource(String fileKey) {
        return fileStorageService.loadFile(fileKey);
    }

    @Override
    public String getFilename(String fileKey) {
        return fileStorageService.getFilename(fileKey);
    }
}