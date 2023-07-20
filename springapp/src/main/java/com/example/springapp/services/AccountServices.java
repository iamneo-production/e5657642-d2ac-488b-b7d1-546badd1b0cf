package com.example.springapp.services;

import java.util.List;

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

 public List<AccountModel> getAccountById(long id) {
     return accountsDao.findById(id);
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

 public void deleteAccount(long id) {
     accountsDao.deleteById(id);
 }
}