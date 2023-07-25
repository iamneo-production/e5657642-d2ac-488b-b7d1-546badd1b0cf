package com.example.springapp.controller;

import com.example.springapp.model.DebtsModel;
import com.example.springapp.repository.DebtsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("https://8081-dabbdacedfaabcfbfbdcabfdecaedefadebea.project.examly.io")
public class DebtsController {

    @Autowired
    private DebtsRepository repo;

    @PostMapping("/Debts")
    DebtsModel newDebt(@RequestBody DebtsModel newDebt){
        return repo.save(newDebt);
    }

    @GetMapping("/getDebts")
    List<DebtsModel> getDebts(){
        return repo.findAll();
    }

    @DeleteMapping("/deleteDebts/{id}")
    String deleteDebt(@PathVariable Long id){
        repo.deleteById(id);
        return "the debt has been deleted";
    }
}

