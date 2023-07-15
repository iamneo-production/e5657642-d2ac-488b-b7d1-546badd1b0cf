package com.example.springapp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.AccountRepository;
import com.example.springapp.model.AccountModel;

//AccountsService.java
@Service
public class AccountServices {
 @Autowired
 private AccountRepository accountsDao;

 public List<AccountModel> getAccounts() {
     return accountsDao.findAll();
 }

 public Optional<AccountModel> getAccountById(Integer accountId) {
     return accountsDao.findById(accountId);
 }

 public List<AccountModel> getAccountsByUserId(long userId) {
     return accountsDao.findByUserId(userId);
 }

 public AccountModel addAccount(AccountModel account) {
     return accountsDao.save(account);
 }

 public AccountModel updateAccount(AccountModel account) {
     return accountsDao.save(account);
 }

 public void deleteAccount(Integer accountId) {
     accountsDao.deleteById(accountId);
 }
}
