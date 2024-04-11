package com.generation.origanboh_spring.dto;

import lombok.Getter;

@Getter
public class LoginStatus {
    
    private String token;

    public void setToken(String ruolo, int idUtente){
        this.token = ruolo + "-" + idUtente;
    }

    public String getRuolo(){
        return token.split("-")[0];
    }

    public int getIdUtente(){
        return Integer.parseInt(token.split("-")[1]);
    }
}
