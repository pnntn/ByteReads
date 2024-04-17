package com.generation.origanboh_spring.dao;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.entities.Acquisto;
import com.generation.origanboh_spring.entities.Entity;

import lombok.Data;

@Service
@Data
public class ClienteProdottoDAO implements IDAO<Integer, Acquisto> {
    
    private final ApplicationContext context;

    private final Database database;

    @Override
    public Integer create(Acquisto a){
        String query = "INSERT INTO prodotti_clienti (id_cliente, id_prodotto, dataacquisto, quantita) VALUES (?, ?, ?, ?)";
        int id = database.eseguiDML(query, a.getIdCliente()+"", a.getIdProdotto()+"", a.getDataacquisto()+"", a.getQuantita()+"");

        return id;
    }

    @Override
    public Map<Integer, Entity> read() {
        String query = "SELECT * FROM prodotti_clienti";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Acquisto a = context.getBean(Acquisto.class, params);
            ris.put(Integer.parseInt(params.get("id")), a);
        }
        return ris;
    }

    @Override
    public Acquisto readById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'readById'");
    }

    @Override
    public void update(Acquisto e) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public void delete(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }
}
