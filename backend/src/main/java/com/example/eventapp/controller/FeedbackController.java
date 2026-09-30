package com.example.eventapp.controller;

import com.example.eventapp.entity.Feedback;
import com.example.eventapp.repository.FeedbackRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping
    public List<Feedback> getAll() {
        return feedbackRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Feedback feedback) {
        try {
            feedback.setId(null);
            feedback.setSubmittedAt(null);
            return ResponseEntity.ok(feedbackRepository.save(feedback));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Unable to save feedback.");
        }
    }
}
