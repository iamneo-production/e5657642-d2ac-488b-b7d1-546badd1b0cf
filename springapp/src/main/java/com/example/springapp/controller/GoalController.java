package com.example.springapp.controller;


import com.example.springapp.exception.GoalNotFoundException;
import com.example.springapp.repository.GoalRepository;
import com.example.springapp.model.Goal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@CrossOrigin("https://8081-eddaadaeccfebebcfbfbdcabeaeaadbdbabf.project.examly.io/")
public class GoalController {

    @Autowired
    private GoalRepository goalRepository;

    @PostMapping("/goal")
    Goal newGoal(@RequestBody Goal newGoal) {
        return goalRepository.save(newGoal);       

    }

    @GetMapping("/goals")
    List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    @GetMapping("/goal/{id}")
    Goal getGoalById(@PathVariable Long id) {
        return goalRepository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException(id));
    }

    @PutMapping("/editgoal/{id}")
    Goal updateGoal(@RequestBody Goal newGoal, @PathVariable Long id) {
        return goalRepository.findById(id)
                .map(goal -> {
                    goal.setGoalname(newGoal.getGoalname());
                    goal.setDescription(newGoal.getDescription());
                    goal.setTargetamount(newGoal.getTargetamount());
                    goal.setCurrentamount(newGoal.getCurrentamount());
                    return goalRepository.save(goal);
                }).orElseThrow(() -> new GoalNotFoundException(id));
    }
    @DeleteMapping("/deletegoal/{id}")
    String deleteGoal(@PathVariable Long id){
        goalRepository.deleteById(id);
        return "the goal has been deleted";
    }
    
    
}
