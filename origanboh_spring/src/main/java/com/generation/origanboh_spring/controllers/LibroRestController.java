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

import com.generation.origanboh_spring.services.LibroService;
import com.generation.origanboh_spring.entities.Libro;

import lombok.Data;

@RestController
@CrossOrigin(origins = {"http://localhost:4200"})
@RequestMapping("api/libro")
@Data
public class LibroRestController {
    
    private final LibroService libroService;

    // http://localhost:8080/api/libro/all
    @GetMapping("/all")
    public ResponseEntity<List<Libro>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(libroService.findAll());     
    }
    
     // http://localhost:8080/api/libro/byId?idLibro=[VALORE]
     @GetMapping("/byId")
     public Libro getById(@RequestParam(name = "idLibro", defaultValue = "0") int id){
        return libroService.findById(id);   
     }
 
     @GetMapping("/delete")
     public boolean delete(@RequestParam(name = "idLibro", defaultValue = "0") int id, @RequestHeader("token") String token){
         String ruolo = token.split("-")[0];
         int idUtente = Integer.parseInt(token.split("-")[1]);
 
         if(id == 0){
             return false;
         }
 
         if(!ruolo.equalsIgnoreCase("ADMIN") || idUtente == -1){
             return false;
         }
         else{
             return libroService.delete(id);
         }
     }
 
     @PostMapping("/insert")
     public Libro insert(@RequestBody Map<String, String> params, @RequestHeader("token") String token){
         String ruolo = token.split("-")[0];
         int idUtente = Integer.parseInt(token.split("-")[1]);
         if(!ruolo.equalsIgnoreCase("ADMIN") || idUtente == -1){
             return null;
         }
         else{
             return libroService.insert(params);
         }
     }
 
 
     @PostMapping("/update")
     public boolean update(@RequestBody Map<String, String> params, @RequestHeader("token") String token){
         String ruolo = token.split("-")[0];
         int idUtente = Integer.parseInt(token.split("-")[1]);
         if(!ruolo.equalsIgnoreCase("ADMIN") || idUtente == -1){
             return false;
         }
         else{
             return libroService.update(params);
         }
     }
 
 
     @GetMapping("/searchByName")
     public List<Libro> searchByName(@RequestParam(name = "nomeprodotto", defaultValue = "") String nomeprodotto){
        return libroService.findByName(nomeprodotto);
     }

}
