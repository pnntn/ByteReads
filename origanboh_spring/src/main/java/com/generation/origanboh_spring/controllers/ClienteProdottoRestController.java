package com.generation.origanboh_spring.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.origanboh_spring.entities.Acquisto;
import com.generation.origanboh_spring.services.ClienteProdottoService;

import lombok.Data;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("api/clienteprodotto")
@Data
public class ClienteProdottoRestController {
    
    private final ClienteProdottoService clienteProdottoService;

    // http://localhost:8080/api/clienteprodotto/byIdCliente?idCliente=[VALORE]
    @GetMapping("/byIdCliente")
    public Map<Integer, Acquisto> getByIdCliente(@RequestParam(name = "idCliente", defaultValue = "0") int id, @RequestHeader("token") String token){
        System.out.println("ID cercato: " + id);
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);

        if(id == 0){
            return null;
        }

        if(ruolo.equalsIgnoreCase("NONE") || idUtente == -1){
            return null;
        }
        else{
            return clienteProdottoService.findByIdCliente(id);
        }
    }

    // http://localhost:8080/api/clienteprodotto/insert
    @PostMapping("/insert")
    public Acquisto insert(@RequestBody Map<String, String> params, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);
        if(!ruolo.equalsIgnoreCase("CLIENTE") || idUtente == -1){
            return null;
        }
        else{
            return clienteProdottoService.insert(params);
        }
    }
}
