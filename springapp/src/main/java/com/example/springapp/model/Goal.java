package com.example.springapp.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
public class Goal {
    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    private Long id;
     private String goalname;
    private String description;
    private String targetamount;
    private String currentamount;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getGoalname() {
        return goalname;
    }
    public void setGoalname(String goalname) {
        this.goalname = goalname;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getTargetamount() {
        return targetamount;
    }
    public void setTargetamount(String targetamount) {
        this.targetamount = targetamount;
    }
    public String getCurrentamount() {
        return currentamount;
    }
    public void setCurrentamount(String currentamount) {
        this.currentamount = currentamount;
    }
    
    }


