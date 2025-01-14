package com.example.calendar.controllers;

import com.example.calendar.models.Event;
import com.example.calendar.services.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/")
public class EventController {
    private final EventService eventService;

    @GetMapping
    public List<Event> getAllEvent() {
        return eventService.allEvent();
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<HttpStatus> addEvent(@RequestBody Event event) {
        eventService.save(event);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
