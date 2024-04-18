package com.generation.origanboh_spring.entities;


import lombok.Data;

@Data
public class AcquistoDettagliato extends Entity{
    private int id;
    private int idCliente;
    private int idProdotto;
    private String dataacquisto;
    private int quantita;
    private String nomeprodotto;
    private double prezzo;
    private int stock;
    private String descrizione;
    private String imgSource;
    private String autore;
    private String genere;
}
