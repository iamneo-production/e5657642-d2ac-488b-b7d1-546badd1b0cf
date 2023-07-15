package com.example.springapp.model;

import javax.persistence.*;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "Transaction")
//@Getter
//@Setter
//@NoArgsConstructor
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Tid;

	private String description;
	private Double credit;
	private Double debit;
	private LocalDate date;

	@ManyToOne
	@JoinColumn(name = "account_id")
	private AccountModel account;

	public Long getTid() {
		return Tid;
	}

	public void setTid(Long tid) {
		Tid = tid;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getCredit() {
		return credit;
	}

	public void setCredit(Double credit) {
		this.credit = credit;
	}

	public Double getDebit() {
		return debit;
	}

	public void setDebit(Double debit) {
		this.debit = debit;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public AccountModel getAccount() {
		return account;
	}

	public void setAccount(AccountModel account) {
		this.account = account;
	}
}

