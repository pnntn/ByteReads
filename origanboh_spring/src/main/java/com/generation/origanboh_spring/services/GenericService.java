package com.generation.origanboh_spring.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.generation.origanboh_spring.dao.IDAO;
import com.generation.origanboh_spring.entities.Entity;

import lombok.Data;

@Data
public abstract class GenericService<TipoID, E extends Entity, D extends IDAO<TipoID, E>> {

    @Autowired
    private D dao;

    @Autowired
    private ApplicationContext context;


    public abstract E constructEntity(Map<String, String> params);

    public List<E> findAll(){
        Map<TipoID, Entity> result = dao.read();
        List<E> lista = new ArrayList<>();
        for(Entity e : result.values()){
            lista.add((E)e);
        }

        return lista;
    }

    public E findById(TipoID id){
        E e = dao.readById(id);
        return e;
    }

    public boolean update(Map<String, String> params){
        E s = constructEntity(params);
        getDao().update(s);
        return true;
    }

    public boolean delete(TipoID id){
        dao.delete(id);
        return true;
    }
    
}
