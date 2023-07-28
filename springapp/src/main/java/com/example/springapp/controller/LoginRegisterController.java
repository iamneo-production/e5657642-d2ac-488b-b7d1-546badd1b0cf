package com.example.springapp.controller;

import com.example.springapp.model.LoginRegisterModel;
import com.example.springapp.repository.LoginRegisterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin("https://8081-ffdbbecdfdbcfbfbdcabfdecaedefadebea.project.examly.io/")
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
    LoginRegisterModel getRegisterById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    @DeleteMapping("/user/{id}")
    String deleteRegisterById(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "User deleted successfully";
        } else {
            return "User not found";
        }
    }

    @PutMapping("/user/{id}")
    LoginRegisterModel updateRegisterById(@PathVariable Long id, @RequestBody LoginRegisterModel updatedRegister) {
        return repo.findById(id)
                .map(register -> {
                    register.setId(updatedRegister.getId());
                    register.setEmail(updatedRegister.getEmail());
                    register.setFirstname(updatedRegister.getFirstname());
                    register.setLastname(updatedRegister.getLastname());
                    register.setPassword(updatedRegister.getPassword());
                    register.setRole(updatedRegister.getRole());
                    // Set other properties accordingly
                    return repo.save(register);
                })
                .orElse(null);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // Invalidate the user's session on the server-side
        request.getSession().invalidate();
        return "Logout successful";
    }

}
