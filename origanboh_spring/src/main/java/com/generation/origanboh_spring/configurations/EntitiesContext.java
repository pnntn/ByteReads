package com.generation.origanboh_spring.configurations;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.generation.origanboh_spring.entities.Cliente;
import com.generation.origanboh_spring.entities.Libro;

@Configuration
public class EntitiesContext {

    @Bean
    @Scope("prototype")
    public Cliente newCliente(Map<String, String> params){
        int id = -1;
        if(params.containsKey("id")){
            id = Integer.parseInt(params.get("id"));
        }
        String nome = params.get("nome");
        String cognome = params.get("cognome");
        String username = params.get("username");
        String password = params.get("password");
        String indirizzo = params.get("indirizzo");

        Cliente c = new Cliente();
        c.setId(id);
        c.setNome(nome);
        c.setCognome(cognome);
        c.setUsername(username);
        c.setPassword(password);
        c.setIndirizzo(indirizzo);
    return c;
    }

    @Bean
    @Scope("prototype")
    public Libro newLibro(Map<String, String> params){
        int id = -1;
        if(params.containsKey("id")){
            id = Integer.parseInt(params.get("id"));
        }
        String nomeProdotto = params.get("nomeProdotto");
        double prezzo = Double.parseDouble(params.get("prezzo"));
        int stock = Integer.parseInt(params.get("stock"));
        String descrizione = params.get("descrizione");
        String imgSource = params.get("imgSource");
        String autore = params.get("autore");
        String genere = params.get("genere");

        Libro l = new Libro();
        l.setId(id);
        l.setNomeProdotto(nomeProdotto);
        l.setPrezzo(prezzo);
        l.setStock(stock);
        l.setDescrizione(descrizione);
        l.setImgSource(imgSource);
        l.setAutore(autore);
        l.setGenere(genere);
        return l;
    }

    //TO:DO LOGIN STATUS

    
}
