package com.example.demo;

import lombok.*;

import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Model {

    @Id
    private String id;
    private String name;
    private String author;
    private String description;
    private String imageUrl;

    public Model(String name, String author, String description, String imageUrl) {
        this.name = name;
        this.author = author;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Model{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
