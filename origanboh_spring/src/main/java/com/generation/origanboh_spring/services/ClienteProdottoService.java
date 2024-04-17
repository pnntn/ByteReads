package com.generation.origanboh_spring.services;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.dao.ClienteProdottoDAO;
import com.generation.origanboh_spring.entities.Acquisto;
import com.generation.origanboh_spring.entities.Entity;

@Service
public class ClienteProdottoService extends GenericService<Integer, Acquisto, ClienteProdottoDAO> {

    @Autowired
    private ClienteProdottoDAO clienteProdottoDAO;

    @Override
    public Acquisto constructEntity(Map<String, String> params){
        Acquisto a = getContext().getBean(Acquisto.class, params);
        return a;
    }

    public Acquisto insert(Map<String, String> params){
        Acquisto a = constructEntity(params);
        int ris = getDao().create(a);
        a.setId(ris);
        
        return a;
    }

    public Map<Integer, Acquisto> findByIdCliente(Integer idCliente){
        Map<Integer, Acquisto> a = getDao().readByIdCliente(idCliente);
        return a;
    }

    
}
