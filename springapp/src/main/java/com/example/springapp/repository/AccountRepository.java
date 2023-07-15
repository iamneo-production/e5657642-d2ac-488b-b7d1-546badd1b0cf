package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.model.AccountModel;

import java.util.*;

public interface AccountRepository extends JpaRepository<AccountModel,Integer> {
    List<AccountModel> findByUserId(long userId);
    Optional<AccountModel> findById(Integer accountId);
}
