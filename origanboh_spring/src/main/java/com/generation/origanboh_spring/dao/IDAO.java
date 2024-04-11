package com.generation.origanboh_spring.dao;

import java.util.Map;

import com.generation.origanboh_spring.entities.Entity;

public interface IDAO<TipoID, E extends Entity>{
    public Integer create(E e);

    public Map<TipoID, Entity> read();

    public E readById(TipoID id);

    public void update(E e);

    public void delete(TipoID id);
}
