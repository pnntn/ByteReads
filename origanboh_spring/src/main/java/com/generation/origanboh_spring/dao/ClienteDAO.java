package com.generation.origanboh_spring.dao;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.entities.Cliente;
import com.generation.origanboh_spring.entities.Entity;

import lombok.Data;

@Service
@Data
public class ClienteDAO implements IDAO<Integer, Cliente>{
    
    private final ApplicationContext context;

    private final Database database;
    
    @Override
    public Integer create(Cliente e) {
        String query = "insert into utenti(nome, cognome) values (?, ?)";
        int id = database.eseguiDML(query, e.getNome(), e.getCognome());

        query = "insert into clienti(id, indirizzo) values(?, ?)";
        database.eseguiDML(query, id+"", e.getIndirizzo());

        return id;
    }

    @Override
    public Map<Integer, Entity> read() {
        String query = "select u.*, c.indirizzo from utenti u join clienti c on u.id = c.id";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Cliente c = context.getBean(Cliente.class, params);
            ris.put(Integer.parseInt(params.get("id")), c);
        }
        return ris;
    }

    @Override
    public Cliente readById(Integer idUtente) {
        String query = "select u.*, c.indirizzo from utenti u join clienti c on u.id = c.id where c.id=?";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, idUtente+"");
        
        Cliente c = null;
        for(Map<String, String> params : result.values()){
            c = context.getBean(Cliente.class, params);
        }
        return c;
    }

    public Map<Integer, Entity> readByLastName(String nome){
        String query = "select u.*, c.indirizzo from utenti u join clienti c on u.id = c.id where UPPER(u.cognome) like(concat(concat('%', UPPER(?)), '%'))";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, nome);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Cliente c = context.getBean(Cliente.class, params);
            ris.put(Integer.parseInt(params.get("id")), c);
        }
        return ris;
    }

    @Override
    public void update(Cliente e) {
        String query = "update utenti set nome=?, cognome=? where id=?";
        database.eseguiDML(query, e.getNome(), e.getCognome(), e.getId()+"");
        query = "update clienti set indirizzo=? where id=?";
        database.eseguiDML(query, e.getIndirizzo(), e.getId()+"");
    }

    @Override
    public void delete(Integer id) {
        String query = "delete from utenti where id=?";
        database.eseguiDML(query, id+"");
    }
    
}
