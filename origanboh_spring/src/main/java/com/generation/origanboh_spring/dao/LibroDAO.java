package com.generation.origanboh_spring.dao;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.entities.Entity;
import com.generation.origanboh_spring.entities.Libro;

import lombok.Data;

@Service
@Data
public class LibroDAO implements IDAO<Integer, Libro>{
    
    private final ApplicationContext context;

    private final Database database;

    @Override
    public Integer create(Libro e) {
        String query = "insert into prodotti(nome_prodotto, prezzo, stock, descrizione, img_source) values (?, ?, ?, ?, ?)";
        int id = database.eseguiDML(query, e.getNomeProdotto(), "DOUBLE:"+e.getPrezzo(), e.getStock()+"", e.getDescrizione(), e.getImgSource());

        query = "insert into libri(id, autore, genere) values(?, ?, ?)";
        database.eseguiDML(query, id+"", e.getAutore(), e.getGenere());
        return id;
    }

    @Override
    public Map<Integer, Entity> read() {
        String query = "select p.*, l.autore, l.genere from prodotti p join libri l on p.id = l.id";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Libro l = context.getBean(Libro.class, params);
            ris.put(Integer.parseInt(params.get("id")), l);
        }
        return ris;
    }

    @Override
    public Libro readById(Integer idLibro) {
        String query = "select p.*, l.autore, l.genere from prodotti p join libri l on p.id = l.id where id=?";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, idLibro+"");
        
        Libro l = null;
        for(Map<String, String> params : result.values()){
            l = context.getBean(Libro.class, params);
        }
        return l;
    }

    public Map<Integer, Entity> readByName(String nome){
        String query = "select p.*, l.autore, l.genere from prodotti p join libri l on p.id = l.id where p.nome_prodotto like(concat(concat('%', ?), '%'))";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, nome);
        Map<Integer, Entity> ris = new HashMap<>();

        for(Map<String, String> params : result.values()){
            Libro l = context.getBean(Libro.class, params);
            ris.put(Integer.parseInt(params.get("id")), l);
        }
        return ris;
    }

    @Override
    public void update(Libro e) {
        String query = "update prodotti set nome_prodotto=?, prezzo=?, stock=?, descrizione=?, img_source=? where id=?";
        database.eseguiDML(query, e.getNomeProdotto(), "DOUBLE:"+e.getPrezzo(), e.getStock()+"", e.getDescrizione(), e.getImgSource(), e.getId()+"");
        query = "update libri set autore=?, genere=? where id=?";
        database.eseguiDML(query, e.getAutore(), e.getGenere(), e.getId()+"");
    }

    @Override
    public void delete(Integer id) {
        String query = "delete from prodotti where id=?";
        database.eseguiDML(query, id+"");
    }
    
}
