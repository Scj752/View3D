package com.example.demo.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.context.annotation.Primary;

import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.FileNotFoundException; // 添加异常类导入
import java.io.InputStream; // 添加 InputStream 导入

import java.nio.file.StandardCopyOption; // 添加文件操作类导入
import java.nio.file.Path;
import java.nio.file.Files;
import java.nio.file.Paths;

import java.net.MalformedURLException;
import java.util.UUID;

import com.example.demo.service.FileStorageService;

@Service("localStorageService")
@Primary
public class LocalStorageService implements FileStorageService {
    
    @Value("${file.upload-dir}")
    private String uploadDir;
    
    public String storeFile(MultipartFile file, String subDirectory) throws IOException {
        // 确保上传目录存在
        Path uploadPath = Paths.get(uploadDir, subDirectory);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // 生成唯一文件名
        String fileName = UUID.randomUUID().toString() + "_" + 
                StringUtils.cleanPath(file.getOriginalFilename());
        
        // 构建完整路径
        Path filePath = uploadPath.resolve(fileName);
        
        // 保存文件
        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IOException("存储文件失败: " + fileName, e);
        }
        
        // 返回相对路径
        return "/" + subDirectory + "/" + fileName;
    }

    public Resource loadFile(String filePath) {
        try {
            Path path = Paths.get(uploadDir).resolve(filePath).normalize();
            Resource resource = new UrlResource(path.toUri());
            
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("文件未找到: " + filePath);
            }
        } catch (MalformedURLException | FileNotFoundException e) {
            throw new RuntimeException("文件加载失败", e);
        }
    }

    public String getFilename(String fileKey) {
        return fileKey.split("/")[1];
    }
    
}