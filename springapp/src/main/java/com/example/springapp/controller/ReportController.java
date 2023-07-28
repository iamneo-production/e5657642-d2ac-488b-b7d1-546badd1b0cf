package com.example.springapp.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.exception.BadRequestException;
import com.example.springapp.services.AccountServices;
import com.example.springapp.services.DebtsServices;

@RestController
@RequestMapping("/Report")
@CrossOrigin(origins = "https://8081-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/")

public class ReportController {


    private final DebtsServices debtsService;
    
            private AccountServices accountservice;
    
           
            public ReportController(DebtsServices debtsService,AccountServices accountservice) {
                this.debtsService = debtsService;
    
                this. accountservice=accountservice;
            }
    
            @GetMapping("/total-interest")
            public Double getTotalInterestSum() {
               Double Debts= debtsService.calculateTotalInterestSum();
               if(Debts==null)
               {
                   throw new BadRequestException("Unable to fetch total Debts");
               }
               return Debts;
            }
           
            @GetMapping("/total-balance/{userId}")
            public Double getTotalBalanceByUserId(@PathVariable Long userId) {
               Double Balance=accountservice.getTotalBalanceByUserId(userId);
               if(Balance==null)
               {
                   throw new BadRequestException("Unable to fetch total Balance");
               }
               return Balance;
            }
            @GetMapping("/Balance")
            public Double getTotalBalance() {
               Double Balance= accountservice.calculateTotalBalance();
               if(Balance==null)
               {
                   throw new BadRequestException("Unable to fetch total Debts");
               }
               return Balance;
            }
    
}
