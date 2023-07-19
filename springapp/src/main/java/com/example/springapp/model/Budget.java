package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Budget {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String category;
	private String purpose;
	private String date;
	private long amount;
	private String status;
	public Budget(long id, String category, String purpose, String date, long amount, String status) {
		super();
		this.id = id;
		this.category = category;
		this.purpose = purpose;
		this.date = date;
		this.amount = amount;
		this.status = status;
	}
	public Budget() {
		super();
		// TODO Auto-generated constructor stub
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getPurpose() {
		return purpose;
	}
	public void setPurpose(String purpose) {
		this.purpose = purpose;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Budget [id=" + id + ", category=" + category + ", purpose=" + purpose + ", date=" + date + ", amount="
				+ amount + ", status=" + status + ", getId()=" + getId() + ", getCategory()=" + getCategory()
				+ ", getPurpose()=" + getPurpose() + ", getDate()=" + getDate() + ", getAmount()=" + getAmount()
				+ ", getStatus()=" + getStatus() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
}
