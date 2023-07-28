package com.example.springapp.repository;

import com.example.springapp.model.DebtsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
public interface DebtsRepository extends JpaRepository<DebtsModel,Long> {

    @Query("SELECT SUM(dm.total_interest_amount) FROM DebtsModel dm")
     Double calculateTotalInterestSum();
}
