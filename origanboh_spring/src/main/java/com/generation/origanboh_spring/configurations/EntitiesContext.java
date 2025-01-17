package com.generation.origanboh_spring.configurations;

import java.sql.Date;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.generation.origanboh_spring.dto.LoginStatus;
import com.generation.origanboh_spring.entities.Acquisto;
import com.generation.origanboh_spring.entities.AcquistoDettagliato;
import com.generation.origanboh_spring.entities.Admin;
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
    public Admin newAdmin(Map<String, String> params){
        int id = -1;
        if(params.containsKey("id")){
            id = Integer.parseInt(params.get("id"));
        }
        String nome = params.get("nome");
        String cognome = params.get("cognome");
        String username = params.get("username");
        String password = params.get("password");

        Admin a = new Admin();
        a.setId(id);
        a.setNome(nome);
        a.setCognome(cognome);
        a.setUsername(username);
        a.setPassword(password);
    return a;
    }

    @Bean
    @Scope("prototype")
    public Libro newLibro(Map<String, String> params){
        int id = -1;
        if(params.containsKey("id")){
            id = Integer.parseInt(params.get("id"));
        }
        String nomeprodotto = params.get("nomeprodotto");
        double prezzo = Double.parseDouble(params.get("prezzo"));
        int stock = Integer.parseInt(params.get("stock"));
        String descrizione = params.get("descrizione");
        String imgsource = params.get("imgsource");
        String autore = params.get("autore");
        String genere = params.get("genere");

        Libro l = new Libro();
        l.setId(id);
        l.setNomeprodotto(nomeprodotto);
        l.setPrezzo(prezzo);
        l.setStock(stock);
        l.setDescrizione(descrizione);
        l.setImgsource(imgsource);
        l.setAutore(autore);
        l.setGenere(genere);
        return l;
    }

    @Bean
    @Scope("prototype")
    public LoginStatus newLoginStatus(String ruolo, int idUtente){
        LoginStatus ls = new LoginStatus();
        ls.setToken(ruolo, idUtente);
        return ls;
    }

    @Bean
    @Scope("prototype")
    public Acquisto newAcquisto(Map<String, String> params){
        int id = -1;
        if(params.containsKey("id") && params.get("id") != null){
            id = Integer.parseInt(params.get("id"));
        }

        int idCliente = -1;
        if(params.containsKey("idcliente") && params.get("idcliente") != null){
            idCliente = Integer.parseInt(params.get("idcliente"));
        }

        int idProdotto = -1;
        if(params.containsKey("idprodotto") && params.get("idprodotto") != null){
            idProdotto = Integer.parseInt(params.get("idprodotto"));
        }

        String dataacquisto = params.get("dataacquisto");
        
        int quantita = -1;
        if(params.containsKey("quantita") && params.get("quantita") != null){
            quantita = Integer.parseInt(params.get("quantita"));
        }

        Acquisto a = new Acquisto();
        a.setId(id);
        a.setIdCliente(idCliente);
        a.setIdProdotto(idProdotto);
        a.setDataacquisto(dataacquisto);
        a.setQuantita(quantita);
        return a;
    }

    @Bean
    @Scope("prototype")
    public AcquistoDettagliato newAcquistoDettagliato(Map<String, String> params) {
        int id = -1;
        if (params.containsKey("id") && params.get("id") != null) {
            id = Integer.parseInt(params.get("id"));
        }
    
        int idCliente = -1;
        if (params.containsKey("idCliente") && params.get("idCliente") != null) {
            idCliente = Integer.parseInt(params.get("idCliente"));
        }
    
        int idProdotto = -1;
        if (params.containsKey("idProdotto") && params.get("idProdotto") != null) {
            idProdotto = Integer.parseInt(params.get("idProdotto"));
        }
    
        int quantita = -1;
        if (params.containsKey("quantita") && params.get("quantita") != null) {
            quantita = Integer.parseInt(params.get("quantita"));
        }
        double prezzo = -1;
        if (params.containsKey("prezzo") && params.get("prezzo") != null) {
            prezzo = Double.parseDouble(params.get("prezzo"));
        }
    String dataAcquisto = params.get("dataacquisto");

    String nomeProdotto = params.get("nomeprodotto");
    int stock = Integer.parseInt(params.get("stock"));
    String descrizione = params.get("descrizione");
    String imgSource = params.get("imgsource");
    String autore = params.get("autore");
    String genere = params.get("genere");

    AcquistoDettagliato acquistoDettagliato = new AcquistoDettagliato();
    acquistoDettagliato.setId(id);
    acquistoDettagliato.setIdCliente(idCliente);
    acquistoDettagliato.setIdProdotto(idProdotto);
    acquistoDettagliato.setDataacquisto(dataAcquisto);
    acquistoDettagliato.setQuantita(quantita);
    acquistoDettagliato.setNomeprodotto(nomeProdotto);
    acquistoDettagliato.setPrezzo(prezzo);
    acquistoDettagliato.setStock(stock);
    acquistoDettagliato.setDescrizione(descrizione);
    acquistoDettagliato.setImgSource(imgSource);
    acquistoDettagliato.setAutore(autore);
    acquistoDettagliato.setGenere(genere);

    return acquistoDettagliato;
}

}
