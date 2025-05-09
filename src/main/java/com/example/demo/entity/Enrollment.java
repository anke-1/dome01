package com.example.demo.entity;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "enrollments")
public class Enrollment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;
    
    @Column(nullable = false)
    private LocalDateTime enrolledAt;
    
    @Column(nullable = false)
    private LocalDateTime lastAccessedAt;
    
    @Column(nullable = false)
    private Double progress; // percentage of course completed
    
    @Column(nullable = false)
    private Boolean completed;
    
    @PrePersist
    protected void onCreate() {
        enrolledAt = LocalDateTime.now();
        lastAccessedAt = LocalDateTime.now();
        progress = 0.0;
        completed = false;
    }
    
    @PreUpdate
    protected void onUpdate() {
        lastAccessedAt = LocalDateTime.now();
    }
} 