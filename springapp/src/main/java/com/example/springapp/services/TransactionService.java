package com.example.springapp.services;

import com.example.springapp.model.AccountModel;
import com.example.springapp.model.Transaction;
import com.example.springapp.repository.AccountRepository;
import com.example.springapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public Transaction addTransactionToAccount(int accountId, Transaction transaction) {
        AccountModel account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found for ID: " + accountId));
        transaction.setAccount(account);
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(int accountId, long transactionId, Transaction updatedTransaction) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found for ID: " + transactionId));


        transaction.setDescription(updatedTransaction.getDescription());
        transaction.setCredit(updatedTransaction.getCredit());
        transaction.setDebit(updatedTransaction.getDebit());
        transaction.setDate(updatedTransaction.getDate());

        return transactionRepository.save(transaction);
    }


    public void deleteTransactionById(long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found for ID: " + transactionId));
        transactionRepository.delete(transaction);
    }

    public Transaction getTransactionById(long transactionId, long id) {
        return transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found for ID: " + transactionId));
    }

    public List<Transaction> getAllTransactionsByAccountId(int accountId) {
        AccountModel account = getAccount(accountId);
        return transactionRepository.findByAccount(account);
    }

    private Transaction getTransaction(int accountId, long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalArgumentException("Transaction not found for ID: " + transactionId));

        AccountModel account = getAccount(accountId);
        if (!transaction.getAccount().equals(account)) {
            throw new IllegalArgumentException("Transaction does not belong to the specified account");
        }

        return transaction;
    }

    private AccountModel getAccount(int accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found for ID: " + accountId));
    }
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
    public List<Transaction> getAllTransactionsByAccountIdOrderByDateDesc(int accountId) {
        return transactionRepository.findByAccountAccountIdOrderByDateDesc(accountId);
    }
}

