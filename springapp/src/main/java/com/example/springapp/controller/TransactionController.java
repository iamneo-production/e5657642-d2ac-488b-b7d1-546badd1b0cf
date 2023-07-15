package com.example.springapp.controller;

import com.example.springapp.model.Transaction;
import com.example.springapp.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://8081-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/")
public class TransactionController {

    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transactions/account/{accountId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Transaction addTransactionToAccount(
            @PathVariable int accountId,
            @RequestBody Transaction transaction
    ) {
        return transactionService.addTransactionToAccount(accountId, transaction);
    }

    @PutMapping("/transactions/account/{accountId}/{transactionId}")
    public Transaction updateTransaction(
            @PathVariable int accountId,
            @PathVariable long transactionId,
            @RequestBody Transaction updatedTransaction
    ) {
        return transactionService.updateTransaction(accountId, transactionId, updatedTransaction);
    }

    @DeleteMapping("/transactions")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTransactionById(
            @RequestParam("id") long transactionId
    ) {
        transactionService.deleteTransactionById(transactionId);
    }



    @GetMapping("/transactions/")
    public Transaction getTransactionById(
            @RequestParam("accountId") int accountId,
            @PathVariable("transactionId") long transactionId
    ) {
        return transactionService.getTransactionById(accountId, transactionId);
    }

    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/transactions/account")
    public List<Transaction> getAllTransactionsByAccountId(@RequestParam("accountId") int accountId) {
        return transactionService.getAllTransactionsByAccountIdOrderByDateDesc(accountId);
    }

}
