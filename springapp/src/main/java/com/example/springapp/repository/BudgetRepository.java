package com.example.springapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Budget;

public interface BudgetRepository extends JpaRepository<Budget,Long>{
	
}
