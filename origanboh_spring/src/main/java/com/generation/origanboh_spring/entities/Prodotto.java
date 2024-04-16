package com.generation.origanboh_spring.entities;

import lombok.Data;

@Data
public abstract class Prodotto extends Entity {
    private String nomeprodotto;
    private double prezzo;
    private int stock; //quantità a magazzino
    private String descrizione;
    private String imgsource;
}
