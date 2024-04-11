package com.generation.origanboh_spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.dao.ClienteDAO;
import com.generation.origanboh_spring.dao.UserDAO;
import com.generation.origanboh_spring.entities.Entity;
import com.generation.origanboh_spring.entities.Cliente;

@Service
public class ClienteService extends GenericService<Integer, Cliente, ClienteDAO>{
    
    @Autowired
    private UserDAO userDAO;

    @Override
    public Cliente constructEntity(Map<String, String> params) {
        Cliente c = getContext().getBean(Cliente.class, params);
        return c;
    }
    
    public Cliente insert(Map<String, String> params){
        Cliente c = constructEntity(params);
        int ris = getDao().create(c);
        c.setId(ris);
        boolean userOk = userDAO.createUser(c.getUsername(), c.getPassword(), c.getId());
        
        if(ris < 1 || !userOk){
            return null;
        }
        return c;
    }

    public List<Cliente> findByName(String nome){
        Map<Integer, Entity> result = getDao().readByName(nome);
        List<Cliente> lista = new ArrayList<>();
        for(Entity e : result.values()){
            if(e instanceof Cliente){
                lista.add((Cliente)e);
            }
        }
        return lista;
    }

    public List<Cliente> findAllFunzionale(){

        List<Cliente> lista = new ArrayList<>();
   
        return getDao().read().values() .stream() .map(x ->{return (Cliente)x;}).toList(); 
    }

}
