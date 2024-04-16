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
@ConditionalOnProperty(name = "db.type", havingValue = "oracle")
public class DatabaseOracle implements Database{

    @Value("${db.oracle.username}")
    private String username;
    
    @Value("${db.oracle.password}")
    private String password;
    
    @Value("${db.oracle.path}")
    private String percorso;

    private Connection connection;
    
    public DatabaseOracle(){}

    @PostConstruct
    public void connect(){
        try
        {
            Class.forName("oracle.jdbc.driver.OracleDriver");

            String percorsoCredenziali = percorso.replace("[USER]", username).replace("[PASSWORD]", password);
            this.connection = DriverManager.getConnection(percorsoCredenziali);
        }   
        catch(ClassNotFoundException e)
        {
            System.out.println("Errore classe driver oracle non trovata" + e.getMessage());
        } 
        catch(SQLException e)
        {
            System.out.println("Errore connessione" + e.getMessage());
        }
    }

    public void closeConnection()
    {
        try
        {
            connection.close();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    public Connection getConnection()
    {
        return this.connection;
    }

    @Override
    public int eseguiDML(String query, String... params){
        PreparedStatement ps = null;
        int ris = -1;
        ResultSet rs = null;
        try{
            String[] cols = {"id"};
            ps = getConnection().prepareStatement(query, cols);

            for(int i = 0; i < params.length; i++){
                if (params[i] != null){
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
            return -1;
        }
        return ris;
    }

    @Override
    public Map<Integer, Map<String, String>> eseguiDQL(String query, String... params){

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

            while(rs.next()) {
                mappaProprieta = new HashMap<>();

                for(int i = 1; i <= rs.getMetaData().getColumnCount(); i++){

                    String chiave = rs.getMetaData().getColumnName(i).toLowerCase().replace("_", "");

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
