package com.example.smart_resume_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.smart_resume_backend.model.Resume;
import com.example.smart_resume_backend.repository.ResumeRepository;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173") // Allows React frontend to connect
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeRepository resumeRepository;

    // ✅ Save resume data
    @PostMapping("/save")
    public Resume saveResume(@RequestBody Resume resume) {
        return resumeRepository.save(resume);
    }

    // ✅ Get all saved resumes
    @GetMapping("/all")
    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }
}
