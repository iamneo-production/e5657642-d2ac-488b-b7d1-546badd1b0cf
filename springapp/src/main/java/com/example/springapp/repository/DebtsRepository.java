package com.example.springapp.repository;

import com.example.springapp.model.DebtsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DebtsRepository extends JpaRepository<DebtsModel,Long> {
}
