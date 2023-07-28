package com.example.springapp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.BudgetRepository;
import com.example.springapp.model.Budget;

@Service
public class BudgetServiceImpl implements BudgetService {
	
	
	@Autowired
	private BudgetRepository budgetDao;
	
	 
	@Override
	public List<Budget> getBudget() {
		return budgetDao.findAll();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Optional<Budget> getBudgetById(long budgetId) {
		// TODO Auto-generated method stub
		return budgetDao.findById(budgetId);
	}

	@Override
	public Budget addBudget(Budget budget) {
		 Budget savedBudget = budgetDao.save(budget);
		 return savedBudget;
	}
	//not changing status that will be different 
	@Override
	public Budget updateBudget(Budget budget) {
		budgetDao.save(budget);
		return budget;
	}

	@SuppressWarnings("deprecation")
	@Override
	public void deleteBudget(long id) {
		// TODO Auto-generated method stub
		Budget entity = budgetDao.getOne(id);
		budgetDao.delete(entity);
	}
	
	
}
