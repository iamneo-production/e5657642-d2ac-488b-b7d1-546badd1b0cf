package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class DebtsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String debt_name;
    private float total_interest;
    private float total_interest_amount;
    private int total_months;
    private String suggestions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDebt_name() {
        return debt_name;
    }

    public void setDebt_name(String debt_name) {
        this.debt_name = debt_name;
    }

    public float getTotal_interest() {
        return total_interest;
    }

    public void setTotal_interest(float total_interest) {
        this.total_interest = total_interest;
    }

    public float getTotal_interest_amount() {
        return total_interest_amount;
    }

    public void setTotal_interest_amount(float total_interest_amount) {
        this.total_interest_amount = total_interest_amount;
    }

    public int getTotal_months() {
        return total_months;
    }

    public void setTotal_months(int total_months) {
        this.total_months = total_months;
    }

    public String getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(String suggestions) {
        this.suggestions = suggestions;
    }
}

