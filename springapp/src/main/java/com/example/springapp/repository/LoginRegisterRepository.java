package com.example.springapp.repository;

import com.example.springapp.model.LoginRegisterModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRegisterRepository extends JpaRepository<LoginRegisterModel,Long> {
}
