package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class AccountModel {
	
	@Id
	private long id;
	private String accountName;
	private String accountType;
	private String balance;
	private long userId;
	
	public AccountModel(long id, String accountName, String accountType, String balance, long userId) {
		super();
		this.id = id;
		this.accountName = accountName;
		this.accountType = accountType;
		this.balance = balance;
		this.userId = userId;
	}

	public AccountModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getBalance() {
		return balance;
	}

	public void setBalance(String balance) {
		this.balance = balance;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Accounts [id=" + id + ", accountName=" + accountName + ", accountType=" + accountType + ", balance="
				+ balance + ", userId=" + userId + "]";
	}

}