package com.example.demo.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ModelUploadRequest {
    private String name;
    private String creatorId;
    private String description;
    private List<String> tags;
    private double fileSize;
    
    // 文件上传字段
    private MultipartFile thumbnail; // 缩略图文件
    private MultipartFile modelFile; // 3D模型文件
}