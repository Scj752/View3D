package com.example.demo.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ContentDisposition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.ModelAttribute;

import org.slf4j.Logger;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;

import com.example.demo.entity.Model;
import com.example.demo.service.ModelService;
import com.example.demo.service.FileStorageService;
import com.example.demo.dto.ModelResponseWithUrl;
import com.example.demo.dto.ModelUploadRequest;

@RestController
@RequestMapping("/api/models")
@Tag(name = "模型管理", description = "3D模型的增删改查接口")
@SecurityRequirement(name = "basicAuth") // 声明需要基本认证
@Slf4j
public class ModelsController {
    
    @Autowired
    private ModelService modelService;

    @Autowired
    private ServletContext servletContext;


    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "上传新模型", description = "上传3D模型文件和相关信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "模型上传成功",
            content = @Content(schema = @Schema(implementation = ModelUploadRequest.class))),
        @ApiResponse(responseCode = "400", description = "无效的上传数据"),
        @ApiResponse(responseCode = "500", description = "文件上传失败")
    })
    public ResponseEntity<Model> createModel(
        @Parameter(description = "模型上传请求", required = true)
        @ModelAttribute ModelUploadRequest request) {

        Model model = modelService.uploadModel(request);
        return ResponseEntity.ok(model);
    }

    @GetMapping("/{id}")
    @Operation(summary = "获取模型详情", description = "返回模型元数据及文件访问 URL")
    @ApiResponse(responseCode = "200", description = "成功获取模型", 
                 content = @Content(schema = @Schema(implementation = ModelResponseWithUrl.class)))
    public ResponseEntity<ModelResponseWithUrl> getModel(@PathVariable String id) {
        Model model = modelService.getModelById(id);
        if (model == null) {
            return ResponseEntity.notFound().build();
        }

        // 生成文件访问 URL（需确保该 URL 可公开访问）
        String fileUrl = "/api/models/download/" + model.getFilePath();
        
        ModelResponseWithUrl response = new ModelResponseWithUrl();
        response.setId(model.getId());
        response.setName(model.getName());
        response.setFileUrl(fileUrl);
        // 其他字段...
        
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download/**")
    @Operation(hidden = true, summary = "下载模型/图片文件", description = "根据文件路径下载模型/图片文件")
    public ResponseEntity<?> downloadFile(
        @Parameter(
            name = "filePath",
            description = "文件路径（需完整输入，如 path/to/file）",
            example = "path/to/file",
            in = ParameterIn.PATH,
            required = true
        )
        HttpServletRequest request) {
        String filePath = request.getRequestURI().split("/download/")[1];
        log.info("Decoded filePath: " + URLDecoder.decode(filePath, StandardCharsets.UTF_8));
        filePath = filePath.replaceAll("/+", "/").replaceAll("^\\.\\./", "");
        log.info("Cleaned filePath: " + filePath);
        // return ResponseEntity.ok().body(filePath);
        try {
            // 加载文件
            Resource resource = modelService.loadFileAsResource(filePath);
            log.info("Resource exists: " + resource.exists());
            // 确定内容类型
            String contentType = "application/octet-stream";
            try {
                if (resource.exists() && resource.getFile().exists()) {
                    contentType = servletContext.getMimeType(resource.getFile().getAbsolutePath());
                }
            } catch (IOException ex) {
                log.info("无法确定文件类型.");
            }
            
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, 
                            "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
                    
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    @Operation(summary = "获取获取所有模型", description = "获取系统中所有模型的列表")
    @ApiResponse(responseCode = "200", description = "成功获取模型列表",
        content = @Content(array = @ArraySchema(schema = @Schema(implementation = Model.class))))
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除模型", description = "根据模型ID删除指定模型")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "模型删除成功"),
        @ApiResponse(responseCode = "404", description = "模型不存在")
    })
    public ResponseEntity<Void> deleteModel(
        @Parameter(description = "模型ID", required = true)
        @PathVariable String id) {
        modelService.deleteModel(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/tag/{tag}")
    @Operation(summary = "按标签搜索模型", description = "根据标签名称搜索相关模型")
    @ApiResponse(responseCode = "200", description = "成功获取模型列表",
        content = @Content(array = @ArraySchema(schema = @Schema(implementation = Model.class))))
    public List<Model> getModelsByTag(
        @Parameter(description = "标签名称", required = true)
        @PathVariable String tag) {
        return modelService.getModelsByTag(tag);
    }
}