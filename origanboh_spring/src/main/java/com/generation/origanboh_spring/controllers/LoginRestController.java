package com.generation.origanboh_spring.controllers;

import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.generation.origanboh_spring.dao.UserDAO;
import com.generation.origanboh_spring.dto.LoginStatus;
import com.generation.origanboh_spring.entities.Admin;
import com.generation.origanboh_spring.entities.Cliente;
import com.generation.origanboh_spring.entities.Utente;

import lombok.Data;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("api/login")
@Data
public class LoginRestController {
    
    private final UserDAO userDAO;

    private final ApplicationContext context;

    @PostMapping("/signin")
    public LoginStatus signin(@RequestBody Map<String, String> params){
        System.out.println(params);
    
        Utente u = userDAO.readFromUsernameAndPassword(params.get("username"), params.get("password"));
        System.out.println("risposta ===========================>" + u);
        LoginStatus ls;
        
        ls = context.getBean(LoginStatus.class, "NONE", 0);
        
        System.out.println("id utente=============================>"+ u.getId());
        if(u instanceof Cliente){
            ls = context.getBean(LoginStatus.class, "CLIENTE", u.getId());
            return ls; 
        }
        else if(u instanceof Admin){
            ls = context.getBean(LoginStatus.class, "ADMIN", u.getId());
            return ls;
        }
        return ls;
    }

    @GetMapping("/checklogin")
    public boolean checkLogin(@RequestHeader("token") String token, @RequestHeader("role") String ruoloRichiesto){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);

        if(ruolo.equalsIgnoreCase("NONE") || idUtente == 0){
            return false;
        }
        else{
            if(ruolo.equals(ruoloRichiesto)){      
                return true;
            }
        }
        return false;
    }

}
