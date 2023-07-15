package com.example.springapp.repository;

import com.example.springapp.model.AccountModel;
import com.example.springapp.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	List<Transaction> findByAccount(AccountModel account);
	@Query("SELECT t FROM Transaction t WHERE t.account.id = :accountId ORDER BY t.date DESC")
	List<Transaction> getAllTransactionsByAccountIdOrderByDateDesc(@Param("accountId") int id);

}

