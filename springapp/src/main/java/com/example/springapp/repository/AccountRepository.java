package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.springapp.model.AccountModel;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface AccountRepository extends JpaRepository<AccountModel, Long> {
    List<AccountModel> findByUserId(long userId);
    List<AccountModel> findById(long id);
    @Query("SELECT SUM(a.balance) FROM AccountModel a")
    Double calculateTotalBalance();
    @Query("SELECT SUM(a.balance) FROM AccountModel a WHERE a.userId = :userId")
    Double calculateTotalBalanceByUserId(@Param("userId") Long userId);
}