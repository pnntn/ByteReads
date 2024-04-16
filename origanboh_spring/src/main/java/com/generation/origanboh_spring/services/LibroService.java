package com.generation.origanboh_spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.dao.LibroDAO;
import com.generation.origanboh_spring.dao.UserDAO;
import com.generation.origanboh_spring.entities.Entity;
import com.generation.origanboh_spring.entities.Libro;

@Service
public class LibroService extends GenericService<Integer, Libro, LibroDAO>{

    @Autowired
    private LibroDAO libroDAO;

    @Override
    public Libro constructEntity(Map<String, String> params) {
        Libro l = getContext().getBean(Libro.class, params);
        return l;
    }
    
    public Libro insert(Map<String, String> params) {

        Libro l = constructEntity(params);
        int ris = getDao().create(l);
        l.setId(ris);

        // Commentato perchè causava una doppia insert
        // libroDAO.create(l);
        return l;
    }

    public List<Libro> findByName(String nome){
        Map<Integer, Entity> result = getDao().readByName(nome);
        List<Libro> lista = new ArrayList<>();
        for(Entity e : result.values()){
            if(e instanceof Libro){
                lista.add((Libro)e);
            }
        }

        return lista;
    }

    public List<Libro> findAllFunzionale(){
        List<Libro> lista = new ArrayList<>();

        return getDao().read().values() .stream().map(x ->{return (Libro)x;}).toList(); 
    }
    
}
