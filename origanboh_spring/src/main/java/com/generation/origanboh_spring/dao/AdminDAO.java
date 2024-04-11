package com.generation.origanboh_spring.dao;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.entities.Admin;
import com.generation.origanboh_spring.entities.Entity;

import lombok.Data;

@Service
@Data
public class AdminDAO implements IDAO<Integer, Admin>{
    
    private final ApplicationContext context;

    private final Database database;

    @Override
    public Integer create(Admin e) {
        String query = "insert into utenti(nome, cognome) values (?, ?)";
        int id = database.eseguiDML(query, e.getNome(), e.getCognome());

        query = "insert into amdin(id) values(?)";
        database.eseguiDML(query, id+"");

        return id;
    }

    @Override
    public Map<Integer, Entity> read() {
        String query = "select u.* from utenti u join admin a on u.id = a.id";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Admin a = context.getBean(Admin.class, params);
            ris.put(Integer.parseInt(params.get("id")), a);
        }
        return ris;
    }

    @Override
    public Admin readById(Integer idUtente) {
        String query = "select u.* from utenti u join admin a on u.id = a.id where a.id=?";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, idUtente+"");
        
        Admin a = null;
        for(Map<String, String> params : result.values()){
            a = context.getBean(Admin.class, params);
        }
        return a;
    }

    public Map<Integer, Entity> readByName(String nome){
        String query = "select u.* from utenti u join admin a on u.id = a.id where u.nome like(concat(concat('%', ?), '%'))";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, nome);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Admin a = context.getBean(Admin.class, params);
            ris.put(Integer.parseInt(params.get("id")), a);
        }
        return ris;
    }

    @Override
    public void update(Admin e) {
        String query = "update utenti set nome=?, cognome=? where id=?";
        database.eseguiDML(query, e.getNome(), e.getCognome(), e.getId()+"");
    }

    @Override
    public void delete(Integer id) {
        String query = "delete from utenti where id=?";
        database.eseguiDML(query, id+"");
    }
    
}
