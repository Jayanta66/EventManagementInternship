package com.example.eventapp.controller;

import com.example.eventapp.entity.Event;
import com.example.eventapp.repository.EventRepository;
import com.example.eventapp.service.FileStorageService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventRepository eventRepository;
    private final FileStorageService fileStorageService;

    public EventController(EventRepository eventRepository, FileStorageService fileStorageService) {
        this.eventRepository = eventRepository;
        this.fileStorageService = fileStorageService;
    }
    
    @GetMapping("/welcome")
    public String welcome() {
    	return "Welcome massage form Back-End";
    }
    

    @GetMapping
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getOne(@PathVariable Long id) {
        return eventRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> create(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam String eventDate,
            @RequestParam String location,
            @RequestPart(required = false) MultipartFile image) {

        try {
            Event event = new Event();
            event.setTitle(title);
            event.setDescription(description);
            event.setEventDate(LocalDate.parse(eventDate));
            event.setLocation(location);

            if (image != null && !image.isEmpty()) {
                event.setImageUrl(fileStorageService.store(image));
            }

            return ResponseEntity.ok(eventRepository.save(event));
        } catch (IllegalArgumentException | IOException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> update(
            @PathVariable Long id,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam String eventDate,
            @RequestParam String location,
            @RequestPart(required = false) MultipartFile image) {

        return eventRepository.findById(id).map(existing -> {
            try {
                existing.setTitle(title);
                existing.setDescription(description);
                existing.setEventDate(LocalDate.parse(eventDate));
                existing.setLocation(location);

                if (image != null && !image.isEmpty()) {
                    existing.setImageUrl(fileStorageService.store(image));
                }

                return ResponseEntity.ok(eventRepository.save(existing));
            } catch (IllegalArgumentException | IOException ex) {
                return ResponseEntity.badRequest().body(ex.getMessage());
            }
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!eventRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        eventRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
