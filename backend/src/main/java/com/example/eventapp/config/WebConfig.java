package com.example.eventapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("https://fullstack-web-app-developed-by-jayanta.joyjagatbondu.com")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");

        registry.addMapping("/uploads/**")
                .allowedOrigins("https://fullstack-web-app-developed-by-jayanta.joyjagatbondu.com")
                .allowedMethods("GET");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String uploadPath = Paths.get("uploads/events").toFile().getAbsoluteFile().toURI().toString();
        registry.addResourceHandler("/uploads/events/**")
                .addResourceLocations(uploadPath);
    }
}
