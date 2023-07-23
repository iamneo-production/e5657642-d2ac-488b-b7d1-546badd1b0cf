package com.example.springapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Budget;
import com.example.springapp.services.BudgetService;

@RestController
@CrossOrigin("https://8081-eddaadaeccfebebcfbfbdcabfdecaedefadebea.project.examly.io/")
public class BudgetController {
	
	@Autowired
	private BudgetService budgetService;
	
	@GetMapping("/budget")
	public ResponseEntity<List<Budget>> getBudget()
	{
		List<Budget> getb = budgetService.getBudget();
		return new ResponseEntity<>(getb, HttpStatus.OK);
	}
	
	@GetMapping("/budget/{id}")
	public Optional<Budget> getBudgetById(@PathVariable String id) {
		return this.budgetService.getBudgetById(Long.parseLong(id));
	}
	
	@PostMapping("/budget")
	public ResponseEntity<Budget> addBudget(@RequestBody Budget budget) {
	    Budget savedBudget = budgetService.addBudget(budget);
	    return new ResponseEntity<>(savedBudget, HttpStatus.CREATED);
	}
	
	@PutMapping("/budget/{id}")
	public ResponseEntity<Budget> updateBudget(@PathVariable String id, @RequestBody Budget budget) {
	  Optional<Budget> existingBudget = budgetService.getBudgetById(Long.parseLong(id));
	  if (existingBudget.isPresent()) {
	    Budget updatedBudget = existingBudget.get();
	    updatedBudget.setCategory(budget.getCategory());
	    updatedBudget.setPurpose(budget.getPurpose());
	    updatedBudget.setDate(budget.getDate());
	    updatedBudget.setAmount(budget.getAmount());
	    updatedBudget.setStatus(budget.getStatus());
	    Budget savedBudget = budgetService.updateBudget(updatedBudget); // Modify the method name to update the budget
	    return new ResponseEntity<>(savedBudget, HttpStatus.OK);
	  } else {
	    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	  }
	}

	@DeleteMapping("/budget/{id}")
	public ResponseEntity<HttpStatus> deleteBudget(@PathVariable String id) {
	  try {
	    budgetService.deleteBudget(Long.parseLong(id));
	    return new ResponseEntity<>(HttpStatus.OK);
	  } catch (Exception e) {
	    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	  }
	}
}
