package com.generation.origanboh_spring.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.generation.origanboh_spring.services.ClienteService;
import com.generation.origanboh_spring.entities.Cliente;

import lombok.Data;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("api/cliente")
@Data
public class ClienteRestController {

    private final ClienteService clienteService;

    @GetMapping("/all")
    public ResponseEntity<List<Cliente>> getAll(@RequestHeader("token") String token){

        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);

        if(!ruolo.equalsIgnoreCase("ADMIN") || idUtente == -1){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        else{
            return ResponseEntity.status(HttpStatus.OK).body(clienteService.findAll());    
        }
    }

    @GetMapping("/byId")
    public Cliente getById(@RequestParam(name = "idCliente", defaultValue = "0") int id, @RequestHeader("token") String token){
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
            return clienteService.findById(id);    
        }
    }

    @GetMapping("/delete")
    public boolean delete(@RequestParam(name = "idCliente", defaultValue = "0") int id, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);

        if(id == 0){
            return false;
        }

        if(ruolo.equalsIgnoreCase("NONE") || idUtente == -1){
            return false;
        }
        else{
            return clienteService.delete(id);
        }
    }

    @PostMapping("/insert")
    public Cliente insert(@RequestBody Map<String, String> params, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);
        if(ruolo.equalsIgnoreCase("NONE") || idUtente == -1){
            return null;
        }
        else{
            return clienteService.insert(params);
        }
    }


    @PostMapping("/update")
    public boolean update(@RequestBody Map<String, String> params, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);
        if(ruolo.equalsIgnoreCase("NONE") || idUtente == -1){
            return false;
        }
        else{
            return clienteService.update(params);
        }
    }


    @GetMapping("/searchByLastName")
    public List<Cliente> searchByName(@RequestParam(name = "cognome", defaultValue = "") String nome, @RequestHeader("token") String token){
        String ruolo = token.split("-")[0];
        int idUtente = Integer.parseInt(token.split("-")[1]);
        if(ruolo.equalsIgnoreCase("NONE") || idUtente == -1){
            return new ArrayList<>();
        }
        else{
            return clienteService.findByLastName(nome);
        }
    }

}
