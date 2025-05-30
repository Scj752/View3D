package com.example.demo.entity;

import lombok.*;

import java.util.List;

import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Model {

    @Id
    private String id;
    private String name;
    private String creatorId;
    private String description;
    private List<String> tags;
    private int likes;
    private int downloads;
    private double fileSize;
    private String previewImageUrl;
    private String filePath;
}
