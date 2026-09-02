package com.example.eventapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path uploadDirectory;

    public FileStorageService(@Value("${app.upload.dir}") String uploadDir) throws IOException {
        this.uploadDirectory = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(this.uploadDirectory);
    }

    public String store(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed.");
        }

        String original = StringUtils.cleanPath(file.getOriginalFilename() == null ? "image" : file.getOriginalFilename());
        String extension = "";
        int dot = original.lastIndexOf('.');
        if (dot >= 0) {
            extension = original.substring(dot).toLowerCase();
        }

        String filename = UUID.randomUUID() + extension;
        Path target = uploadDirectory.resolve(filename).normalize();

        if (!target.getParent().equals(uploadDirectory)) {
            throw new IOException("Invalid file path.");
        }

        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/events/" + filename;
    }
}
