package com.generation.origanboh_spring.entities;

import lombok.Data;

@Data
public class Cliente extends Utente{
    private String indirizzo;
    //private double pocket; --SE VOGLIAMO FARE UNA SORTA DI PORTAFOGLIO(saldo amazon)
}
