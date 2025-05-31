package com.example.demo.controller;

import com.example.demo.entity.Model;
import com.example.demo.service.ModelService;
import com.example.demo.dto.ModelUploadRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ModelsController.class)
public class ModelsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ModelService modelService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateModel() throws Exception {
        // 创建 MockMultipartFile 模拟文件上传
        MockMultipartFile thumbnail = new MockMultipartFile(
                "thumbnail",
                "thumbnail.jpg",
                MediaType.IMAGE_JPEG_VALUE,
                "thumbnail content".getBytes()
        );

        MockMultipartFile modelFile = new MockMultipartFile(
                "modelFile",
                "model.glb",
                MediaType.APPLICATION_OCTET_STREAM_VALUE,
                "model content".getBytes()
        );

        // 创建 ModelUploadRequest 对象
        ModelUploadRequest request = new ModelUploadRequest();
        request.setName("Test Model");
        request.setCreatorId("1");
        request.setDescription("This is a test model");
        request.setTags(List.of("test", "model"));
        request.setFileSize(10.5);

        // 创建模拟的 Model 对象
        Model model = new Model();
        model.setId("1");
        model.setName(request.getName());
        model.setCreatorId(request.getCreatorId());
        model.setDescription(request.getDescription());
        model.setTags(request.getTags());
        model.setFileSize(request.getFileSize());

        // 模拟 modelService.uploadModel 方法的返回值
        when(modelService.uploadModel(request)).thenReturn(model);

        // 执行 POST 请求
        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/models/upload")
               .file(thumbnail)
               .file(modelFile)
               .param("name", request.getName())
               .param("creatorId", request.getCreatorId())
               .param("description", request.getDescription())
               .param("tags", String.join(",", request.getTags()))
               .param("fileSize", String.valueOf(request.getFileSize()))
               .contentType(MediaType.MULTIPART_FORM_DATA)
        )
               .andExpect(MockMvcResultMatchers.status().isOk())
               .andExpect(MockMvcResultMatchers.content().string("/api/models/" + model.getId()));
    }

    // @Test
    // public void testGetModel() throws Exception {
    //     String modelId = "1";
    //     Model model = new Model(modelId, "Test Model", "user1", "Description", Arrays.asList("tag1"), LocalDateTime.now(), 0, 0, 10.5, "thumbnailUrl", "filePath");
    //     when(modelService.getModelById(modelId)).thenReturn(model);

    //     mockMvc.perform(get("/api/models/{id}", modelId))
    //            .andExpect(status().isOk())
    //            .andExpect(jsonPath("$.id").value(modelId));
    // }

    // @Test
    // public void testGetAllModels() throws Exception {
    //     Model model1 = new Model("1", "Test Model 1", "user1", "Description 1", Arrays.asList("tag1"), LocalDateTime.now(), 0, 0, 10.5, "thumbnailUrl1", "filePath1");
    //     Model model2 = new Model("2", "Test Model 2", "user2", "Description 2", Arrays.asList("tag2"), LocalDateTime.now(), 0, 0, 20.5, "thumbnailUrl2", "filePath2");
    //     List<Model> models = Arrays.asList(model1, model2);
    //     when(modelService.getAllModels()).thenReturn(models);

    //     mockMvc.perform(get("/api/models/all"))
    //            .andExpect(status().isOk())
    //            .andExpect(jsonPath("$[0].id").value("1"));
    // }

    // @Test
    // public void testDeleteModel() throws Exception {
    //     String modelId = "1";
    //     mockMvc.perform(delete("/api/models/{id}", modelId))
    //            .andExpect(status().isNoContent());
    // }

    // @Test
    // public void testGetModelsByTag() throws Exception {
    //     String tag = "tag1";
    //     Model model = new Model("1", "Test Model", "user1", "Description", Arrays.asList(tag), LocalDateTime.now(), 0, 0, 10.5, "thumbnailUrl", "filePath");
    //     List<Model> models = Arrays.asList(model);
    //     when(modelService.getModelsByTag(tag)).thenReturn(models);

    //     mockMvc.perform(get("/api/models/tag/{tag}", tag))
    //            .andExpect(status().isOk())
    //            .andExpect(jsonPath("$[0].tags[0]").value(tag));
    // }
}