package com.example.springapp.controller;

import java.util.*;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.springapp.services.AccountServices;
import com.example.springapp.model.AccountModel;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



//MyController.java
@RestController
@CrossOrigin("https://8081-febebabeadffbfbcfbfbdcabfdecaedefadebea.project.examly.io/")
public class AccountController {
 @Autowired
 private AccountServices accountsService;

 // Retrieving all accounts
 @GetMapping("/accounts")
 public List<AccountModel> getAccounts() {
     return this.accountsService.getAccounts();
 }

 // Retrieving accounts by ID
 @GetMapping("/accounts/id")
 public List<AccountModel> getAccountById(@RequestParam("id") long id) {
     return this.accountsService.getAccountById(id);
 }

 // Retrieving accounts by userId
 @GetMapping("/accounts/user")
 public List<AccountModel> getAccountsByUserId(@RequestParam("userId") long userId) {
     return this.accountsService.getAccountsByUserId(userId);
 }

 // Adding a new account
 @PostMapping("/accounts")
 public AccountModel addAccount(@RequestBody AccountModel account) {
     return this.accountsService.addAccount(account);
 }

 // Updating an existing account
 @PutMapping("/accounts")
 public AccountModel updateAccount(@RequestBody AccountModel account) {
     return this.accountsService.updateAccount(account);
 }

 // Deleting an account by ID
 @DeleteMapping("/accounts")
 public ResponseEntity<HttpStatus> deleteAccountById(@RequestParam("id") long id) {
     try {
         this.accountsService.deleteAccount(id);
         return new ResponseEntity<>(HttpStatus.OK);
     } catch (Exception e) {
         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
     }
 }
}

