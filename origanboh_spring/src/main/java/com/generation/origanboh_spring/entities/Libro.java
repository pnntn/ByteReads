package com.generation.origanboh_spring.entities;

import lombok.Data;

@Data
public class Libro extends Prodotto {
    private String autore;
    private String genere;
}
