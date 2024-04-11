package com.generation.origanboh_spring.dao;

import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.generation.origanboh_spring.entities.Admin;
import com.generation.origanboh_spring.entities.Cliente;
import com.generation.origanboh_spring.entities.Utente;

import lombok.Data;

@Service
@Data
public class UserDAO {
 
    private final Database database;

    private final ApplicationContext context;

    private final ClienteDAO clienteDAO;

    private final AdminDAO adminDAO;

    public Utente readFromUsernameAndPassword(String username, String password){
        String query = "select id from utenti where username=? and password=?";
        Map<Integer, Map<String, String>> result = database.eseguiDQL(query, username, password);
        int idUtente = -1;
        for(int id : result.keySet()){
            idUtente = id;
        }
        Utente ris = null;
        if(idUtente > 0){
            Cliente c = clienteDAO.readById(idUtente);
            Admin a = adminDAO.readById(idUtente);

            if(c != null){
                ris = c;
            }
            else if(a != null){
                ris = a;
            }
        }

        return ris;
    
    }

    public boolean createUser(String username, String password, int idUtente){
        String query = "update utenti set username=?, password=? where id=?";
        int check = database.eseguiDML(query, username, password, idUtente+"");
        if(check == -2){
            return false;
        }
        return true;
    }

}
