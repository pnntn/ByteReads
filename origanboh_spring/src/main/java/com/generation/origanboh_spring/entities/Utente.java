package com.generation.origanboh_spring.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
public abstract class Utente extends Entity {
    private String nome;
    private String cognome;

    @JsonIgnore
    private String username;

    @JsonIgnore
    private String password;
}
