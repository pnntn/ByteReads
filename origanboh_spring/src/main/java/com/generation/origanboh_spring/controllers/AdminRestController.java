package com.generation.origanboh_spring.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.origanboh_spring.entities.Admin;
import com.generation.origanboh_spring.services.AdminService;

import lombok.Data;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("api/amdin")
@Data
public class AdminRestController {
    
    private final AdminService adminService;

    @GetMapping("/byId")
    public Admin getById(@RequestParam(name = "idAdmin", defaultValue = "0") int id, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idPersona = Integer.parseInt(token.split("-")[1]);

        if(ruolo.equalsIgnoreCase("NONE") || idPersona == -1){
            return null;
        }
        else{
            return adminService.findById(id);
        }
    }

}
