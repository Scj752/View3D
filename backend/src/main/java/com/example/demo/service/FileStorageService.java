package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.io.IOException;

public interface FileStorageService {
    /**
     * 存储文件并返回访问路径
     * @param file        待存储的文件
     * @param directory   存储目录（如 "thumbnails"、"models"）
     * @return 文件访问路径（如 "/thumbnails/abc.jpg" 或 "https://bucket.example.com/models/def.gltf"）
     * @throws IOException 文件存储失败
     */
    String storeFile(MultipartFile file, String directory) throws IOException;
    String getFilename(String fileKey);
    Resource loadFile(String fileKey);
}