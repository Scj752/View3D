package com.example.demo.service.impl;

import com.example.demo.service.FileStorageService;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
//import org.springframework.cloud.aws.core.io.s3.AmazonS3Resource;

import java.io.IOException;
import java.io.InputStream;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.UUID;

@Service("cloudStorageService") // 自定义 Bean 名称
public class CloudStorageService implements FileStorageService {

    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Autowired
    private S3Client s3Client;

    @Override
    public String storeFile(MultipartFile file, String directory) throws IOException {
        String objectKey = directory + "/" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        try (InputStream inputStream = file.getInputStream()) {
            s3Client.putObject(
                PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(objectKey)
                    .build(),
                RequestBody.fromInputStream(inputStream, file.getSize()) // 包装 InputStream
            );
        }

        return "https://" + bucketName + ".s3.amazonaws.com/" + objectKey;
    }

    // @Override
    // public Resource loadFile(String fileKey) {
    //     return new AmazonS3Resource(s3Client, bucketName, fileKey);
    // }

    @Override
    public Resource loadFile(String fileKey) {
        try {
            // 检查文件是否存在
            HeadObjectRequest headRequest = HeadObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .build();
            HeadObjectResponse response = s3Client.headObject(headRequest);

            // 构建 S3 对象的预签名 URL（可选，适用于临时访问）
            String s3Url = String.format("s3://%s/%s", bucketName, fileKey);
            return new UrlResource(new URI(s3Url));
            
            // 或者直接返回 InputStream 包装的资源
            /*
            GetObjectRequest getRequest = GetObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileKey)
                    .build();
            return new InputStreamResource(s3Client.getObject(getRequest));
            */
            
        } catch (Exception e) {
            throw new RuntimeException("无法加载文件: " + fileKey, e);
        }
    }

    @Override
    public String getFilename(String fileKey) {
        return fileKey.split("/")[1]; 
    }
}