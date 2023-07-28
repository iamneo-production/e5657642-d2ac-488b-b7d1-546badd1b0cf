package com.example.springapp.controller;

import com.example.springapp.model.TransactionModel;
import com.example.springapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("https://8081-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io")
public class TransactionController {

    @Autowired
    private TransactionRepository repo;

    @PostMapping("/transactions")
    TransactionModel newTransaction(@RequestBody TransactionModel newTransaction) {
        return repo.save(newTransaction);
    }

    @GetMapping("/transactions/id")
    ResponseEntity<TransactionModel> getTransactionById(@RequestParam Long id) {
        Optional<TransactionModel> optionalTransaction = repo.findById(id);
        return optionalTransaction.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/transactions/{Tid}")
    ResponseEntity<TransactionModel> updateTransaction(@PathVariable Long Tid, @RequestBody TransactionModel updatedTransaction) {
        Optional<TransactionModel> optionalTransaction = repo.findById(Tid);
        if (optionalTransaction.isPresent()) {
            TransactionModel existingTransaction = optionalTransaction.get();
            existingTransaction.setDate(updatedTransaction.getDate());
            existingTransaction.setDescription(updatedTransaction.getDescription());
            existingTransaction.setCredit(updatedTransaction.getCredit());
            existingTransaction.setDebit(updatedTransaction.getDebit());
            repo.save(existingTransaction);
            return ResponseEntity.ok(existingTransaction);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/transactions")
    ResponseEntity<Void> deleteTransaction(@RequestParam Long id) {
        Optional<TransactionModel> optionalTransaction = repo.findById(id);
        if (optionalTransaction.isPresent()) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
