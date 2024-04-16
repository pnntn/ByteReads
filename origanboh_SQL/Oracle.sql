CREATE TABLE utenti (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE admin (
    id INT PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES utenti(id) ON DELETE CASCADE
);

CREATE TABLE clienti (
    id INT PRIMARY KEY,
    indirizzo VARCHAR(50),
    FOREIGN KEY (id) REFERENCES utenti(id) ON DELETE CASCADE
);

CREATE TABLE prodotti (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nomeprodotto VARCHAR(50),
    prezzo NUMBER,
    stock INT,
    descrizione VARCHAR(500), 
    imgsource VARCHAR(100) 
);

CREATE TABLE libri (
    id INT PRIMARY KEY,
    autore VARCHAR(50),
    genere VARCHAR(50),
    FOREIGN KEY (id) REFERENCES prodotti(id) ON DELETE CASCADE
);

CREATE TABLE prodotti_clienti (
    id_cliente INT,
    id_prodotto INT,
    FOREIGN KEY (id_cliente) REFERENCES clienti(id) ON DELETE CASCADE,
    FOREIGN KEY (id_prodotto) REFERENCES prodotti(id) ON DELETE CASCADE
);



-- INSERIMENTO ADMIN

INSERT INTO utenti (nome, cognome, username, password) VALUES ('Mario', 'Rossi', 'admin', 'password');
INSERT INTO admin (id) values (1);

-- INSERIMENTO UTENTE PROVA
INSERT INTO utenti (nome, cognome, username, password) VALUES ('Fabio', 'Verdi', 'fabio', 'verdi');
INSERT INTO clienti (id, indirizzo) VALUES (2, 'Via Roma 1, Torino');


-- INSERIMENTO PRODOTTI

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il signore degli anelli', 25.99, 50, 'Fantasy epico di J.R.R. Tolkien', 'img/lotr.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Harry Potter e la Pietra Filosofale', 20.99, 70, 'Romanzo fantasy di J.K. Rowling', 'img/harry_potter.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Cronache del ghiaccio e del fuoco', 29.99, 45, 'Saga fantasy di George R.R. Martin', 'img/got.jpg');

-- Inserimento dati nella tabella prodotti
INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il nome della rosa', 18.50, 30, 'Romanzo storico di Umberto Eco', 'img/nome_della_rosa.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('1984', 15.99, 25, 'Romanzo distopico di George Orwell', 'img/1984.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il giovane Holden', 12.75, 40, 'Romanzo di J.D. Salinger', 'img/il_giovane_holden.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Cime tempestose', 14.99, 20, 'Romanzo romantico di Emily Brontë', 'img/cime_tempestose.jpg');



-- INSERIMENTO LIBRI

INSERT INTO libri (id, autore, genere)
VALUES (1, 'J.R.R. Tolkien', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (2, 'J.K. Rowling', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (3, 'George R.R. Martin', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (4, 'Umberto Eco', 'Romanzo storico');

INSERT INTO libri (id, autore, genere)
VALUES (5, 'George Orwell', 'Distopia');

INSERT INTO libri (id, autore, genere)
VALUES (6, 'J.D. Salinger', 'Narrativa');

INSERT INTO libri (id, autore, genere)
VALUES (7, 'Emily Brontë', 'Romanzo romantico');



-- DROP TABELLE

drop table utenti;
drop table admin;
drop table clienti;
drop table prodotti;
drop table libri;
drop table prodotti_clienti;

