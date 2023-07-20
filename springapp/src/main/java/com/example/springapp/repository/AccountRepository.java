package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.model.AccountModel;

import java.util.List;

public interface AccountRepository extends JpaRepository<AccountModel, Long> {
    List<AccountModel> findByUserId(long userId);
    List<AccountModel> findById(long id);
}