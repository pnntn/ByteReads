package com.generation.origanboh_spring.dao;


import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
@ConditionalOnProperty(name = "db.type", havingValue = "mysql")
public class DatabaseMysql implements Database{
    @Value("${db.mysql.username}")
    private String username;
    
    @Value("${db.mysql.password}")
    private String password;
    
    @Value("${db.mysql.path}")
    private String path;

    @Value("${db.mysql.timezone}")
    private String timezone;

    @Value("${db.mysql.schema}")
    private String nomeDb;

    private Connection connection;

    public DatabaseMysql(){}

    @PostConstruct
    public void connect(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(path + nomeDb + timezone, username, password);
        }
        catch(SQLException e){
            System.out.println("Errore connesione: " + e.getMessage());
            e.printStackTrace();
        }
        catch(ClassNotFoundException e){
            System.out.println("Driver non trovato");
        }
    }

    public void closeConnection(){
        try{
            connection.close();
        }
        catch(SQLException e){
            System.out.println("Errore chiusura connessione");
        }
    }

    public Connection getConnection(){
        return connection;
    }


    //Il metodo eseguiDML() si occupa di eseguire una generica DML prendendo come parametri la query e un varargs di stringhe
    //in modo che le query possano essere parametrizzate con il solito metodo dei placeholder ('?'). I varargs si gestiscono esattemente come se fosse un vettore
    //equivale a scrivere un metodo con questa firma eseguiDML(String query, String[] params)
    //ESEMPIO:
    //query = "insert into studenti(id, matricola, id_classe) values(?, ?, ?)"
    //params --> avrà i parametri da dover sostituire ai placeholder nell'ordine corretto
    @Override
    public int eseguiDML(String query, String... params){
        PreparedStatement ps = null;
        int ris = -1;
        ResultSet rs = null;
        try{
            String[] cols = {"id"};
            ps = getConnection().prepareStatement(query, cols);
            //Eseguo un ciclo sui parametri che mi arrivano dai varargs
            //e rimpiazzo i placeholder con gli stessi parametri
            for(int i = 0; i < params.length; i++){
                String[] split = params[i].split(":");
                if(split[0].equals("DATA")){
                    ps.setDate(i+1, Date.valueOf(split[1]));
                }
                else if(split[0].equals("DOUBLE")){
                    ps.setDouble(i+1, Double.parseDouble(split[1]));
                }
                else{
                    ps.setString(i+1, params[i]);
                }
            }

            ps.executeUpdate();
            rs = ps.getGeneratedKeys();
            if(rs.next()){
                ris = rs.getInt(1);
            }


            if(ps != null){
                ps.close();
            }

            if(rs != null){
                rs.close();
            }

        }
        catch(SQLException e){
            System.out.println("Errore nella query:\n" + query + "\n" + e.getMessage());
            //Ritorniamo -2 perchè nel caso della insert avremo come ritorno un -1 se non si è riuscito a prendere la chiave primaria generata dal database
            //mentre nelle update e nelle delete ritornerebbe sempre -1 perchè non stiamo generando una chiave primaria nuova, pertanto
            //per segnalare errore ritorno un valore differente (-2)
            return -2;
        }
        return ris;
    }

    @Override
    public Map<Integer, Map<String, String>> eseguiDQL(String query, String... params){
        //Mi preparo una mappa che associ ad una chiave intera un'altra mappa fatta da chiavi che sono i nomi delle proprieta' mentre i valori i valori delle proprieta' stesse
        //in modo da mappare un oggetto generico utilizzando i nomi delle colonne del db come nomi delle proprieta' e quindi come chiavi.
        Map<Integer, Map<String, String>> ris = new HashMap<>();
        PreparedStatement ps = null;
        ResultSet rs = null;

        try{
            ps = getConnection().prepareStatement(query);
            for(int i = 0; i < params.length; i++){
                ps.setString(i+1, params[i]);
            }

            rs = ps.executeQuery();

            Map<String, String> mappaProprieta;

            //Ciclo le righe del ResultSet
            while(rs.next()) {
                mappaProprieta = new HashMap<>();
                //Ciclo le colonne del ResultSet utilizzando i metadati (quantita' di colonne presenti e nomi delle colonne stesse)
                for(int i = 1; i <= rs.getMetaData().getColumnCount(); i++){
                    //Come chiave prendo il nome della colonna in posizione i, e modifico il nome affinche' non abbia underscore e che sia tutto minuscolo
                    //data_nascita --> datanascita
                    String chiave = rs.getMetaData().getColumnName(i).toLowerCase().replace("_", "");

                    //Il valore lo prendo da ResultSet come stringa utilizzando ancora la poszione della colonna i
                    String valore = "";
                    if("DATE".equalsIgnoreCase(rs.getMetaData().getColumnTypeName(i)))
                    {
                        valore = rs.getDate(i).toString();
                    }
                    else
                    {
                        valore = rs.getString(i);
                    }

                    mappaProprieta.put(chiave, valore);
                }
                ris.put(rs.getInt("id"), mappaProprieta);
            }

        }
        catch(SQLException e){
            System.out.println("Errore nella query:\n" + query + "\n" + e.getMessage());
        }

        return ris;
    }
}
