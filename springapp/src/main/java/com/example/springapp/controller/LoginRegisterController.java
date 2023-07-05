package com.example.springapp.controller;

import com.example.springapp.model.LoginRegisterModel;
import com.example.springapp.repository.LoginRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.*;

@RestController
@CrossOrigin("https://8081-edbafcdbcfbfbdcabfdecaedefadebea.project.examly.io")
public class LoginRegisterController {

    @Autowired
    private LoginRegisterRepository repo;

    @PostMapping("/register")
    LoginRegisterModel newRegister(@RequestBody LoginRegisterModel newRegister) {
        return repo.save(newRegister);
    }

    @GetMapping("/user")
    List<LoginRegisterModel> getRegister() {
        return repo.findAll();
    }

    @GetMapping("/user/{id}")
    String getRegisterById(@PathVariable Long id) {
        repo.findAllById(Collections.singleton(id));
        return "user found";
    }
    

}
