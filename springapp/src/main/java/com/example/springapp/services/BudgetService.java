package com.example.springapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.springapp.model.Budget;

public interface BudgetService {
	public List<Budget> getBudget();
	public Optional<Budget> getBudgetById(long budgetId);
	public Budget addBudget(Budget budget);
	public Budget updateBudget(Budget budget);
	public void deleteBudget(long id);
}
