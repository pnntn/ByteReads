//ATTENZIONE
//L'HA CREATA CHAT-GPT, RICONTROLLARE ERRORI
package com.generation.origanboh_spring.entities;

import java.sql.Date;

import lombok.Data;

@Data
public class Acquisto extends Entity {
    private int idCliente;
    private int idProdotto;
    private String dataacquisto;
    private int quantita;
}
