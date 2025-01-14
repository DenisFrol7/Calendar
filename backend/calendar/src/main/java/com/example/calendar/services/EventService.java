package com.example.calendar.services;

import com.example.calendar.models.Event;
import com.example.calendar.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private final EventRepository eventRepository;

    public List<Event> allEvent() {
        return eventRepository.findAll();
    }

    public void save(Event event) {
        eventRepository.save(event);
    }
}
