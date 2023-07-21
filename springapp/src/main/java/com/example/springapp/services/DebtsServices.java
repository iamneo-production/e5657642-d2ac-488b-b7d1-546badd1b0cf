package com.example.springapp.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.DebtsRepository;
@Service
public class DebtsServices {


    private final DebtsRepository debtsRepository;

	    @Autowired
	    public DebtsServices(DebtsRepository debtsRepository) {
	        this.debtsRepository = debtsRepository;
	    }

	    public Double calculateTotalInterestSum() {
	        return debtsRepository.calculateTotalInterestSum();
	    }
    
}
