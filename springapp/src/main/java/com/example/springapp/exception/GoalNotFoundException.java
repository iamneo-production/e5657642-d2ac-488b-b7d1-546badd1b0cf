package com.example.springapp.exception;

public class GoalNotFoundException extends RuntimeException{
    public GoalNotFoundException(Long id){
        super("Could not found the goal with id "+ id);
    }
} 
