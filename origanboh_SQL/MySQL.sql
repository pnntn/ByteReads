drop database if exists sito;
create database sito;
use sito;

CREATE TABLE utenti (
    id int primary key auto_increment,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(50)
);

CREATE TABLE admin (
    id INT,
    FOREIGN KEY (id) REFERENCES utenti(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE clienti (
    id INT,
    indirizzo VARCHAR(50),
    FOREIGN KEY (id) REFERENCES utenti(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prodotti (
    id int primary key auto_increment,
    nomeprodotto VARCHAR(50),
    prezzo DECIMAL(10,2),
    stock INT,
    descrizione VARCHAR(500), 
    imgsource VARCHAR(100) 
);

CREATE TABLE libri (
    id INT,
    autore VARCHAR(50),
    genere VARCHAR(50),
    FOREIGN KEY (id) REFERENCES prodotti(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE prodotti_clienti (
    id_cliente INT,
    id_prodotto INT,
    FOREIGN KEY (id_cliente) REFERENCES clienti(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_prodotto) REFERENCES prodotti(id) ON DELETE CASCADE ON UPDATE CASCADE
);



-- INSERIMENTO ADMIN

INSERT INTO utenti (nome, cognome, username, password) VALUES ('Mario', 'Rossi', 'admin', 'password');
INSERT INTO admin (id) values (1);



-- INSERIMENTO UTENTE PROVA
INSERT INTO utenti (nome, cognome, username, password) VALUES ('Fabio', 'Verdi', 'fabio', 'verdi');
INSERT INTO clienti (id, indirizzo) VALUES (2, 'Via Roma 1, Torino');



-- INSERIMENTO PRODOTTI

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il signore degli anelli', 25.99, 50, 'Fantasy epico di J.R.R. Tolkien', 'https://covers.openlibrary.org/b/id/14545983-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Harry Potter e la Pietra Filosofale', 20.99, 70, 'Romanzo fantasy di J.K. Rowling', 'https://covers.openlibrary.org/b/id/12373652-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Cronache del ghiaccio e del fuoco - Tempesta di spade', 29.99, 45, 'Saga fantasy di George R.R. Martin', 'https://covers.openlibrary.org/b/id/14405797-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il nome della rosa', 18.50, 30, 'Romanzo storico di Umberto Eco', 'https://covers.openlibrary.org/b/id/976764-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('1984', 15.99, 25, 'Romanzo distopico di George Orwell', 'https://covers.openlibrary.org/b/id/12454965-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il giovane Holden', 12.75, 40, 'Romanzo di J.D. Salinger', 'https://covers.openlibrary.org/b/id/11973039-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Cime tempestose', 14.99, 20, 'Romanzo romantico di Emily Brontë', 'https://covers.openlibrary.org/b/id/11469269-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('La ragazza di Fuoco', 21.50, 55, 'Secondo libro della trilogia di Suzanne Collins', 'https://covers.openlibrary.org/b/id/13613624-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il grande Gatsby', 16.99, 40, 'Romanzo di F. Scott Fitzgerald', 'https://covers.openlibrary.org/b/id/8248481-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Le cronache di Narnia', 23.99, 60, 'Saga fantasy di C.S. Lewis', 'https://covers.openlibrary.org/b/id/12075354-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('La cattedrale del mare', 19.75, 35, 'Romanzo storico di Ildefonso Falcones', 'https://covers.openlibrary.org/b/id/6259260-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il vecchio e il mare', 14.50, 25, 'Romanzo di Ernest Hemingway', 'https://covers.openlibrary.org/b/id/13866101-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Dune', 27.99, 50, 'Romanzo di fantascienza di Frank Herbert', 'https://covers.openlibrary.org/b/id/13008986-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('L''isola del tesoro', 12.99, 30, 'Romanzo d''avventura di Robert Louis Stevenson', 'https://covers.openlibrary.org/b/id/12472954-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Orgoglio e Pregiudizio', 18.99, 45, 'Romanzo di Jane Austen', 'https://covers.openlibrary.org/b/id/14552692-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('L''ombra del vento', 22.50, 55, 'Romanzo di Carlos Ruiz Zafón', 'https://covers.openlibrary.org/b/id/10869582-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Cronache del mondo emerso', 24.99, 40, 'Saga fantasy di Licia Troisi', 'https://covers.openlibrary.org/b/id/10181207-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Le avventure di Sherlock Holmes', 17.75, 60, 'Raccolta di racconti di Arthur Conan Doyle', 'https://covers.openlibrary.org/b/id/8348999-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Don Chisciotte della Mancia', 20.50, 30, 'Romanzo di Miguel de Cervantes', 'https://covers.openlibrary.org/b/id/9835300-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il piccolo principe', 13.99, 25, 'Romanzo di Antoine de Saint-Exupéry', 'https://covers.openlibrary.org/b/id/11345591-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('L''isola misteriosa', 16.99, 50, 'Romanzo d''avventura di Jules Verne', 'https://covers.openlibrary.org/b/id/13534163-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Anna Karenina', 19.99, 35, 'Romanzo di Lev Tolstoj', 'https://covers.openlibrary.org/b/id/13180796-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Moby Dick', 23.50, 40, 'Romanzo di Herman Melville', 'https://covers.openlibrary.org/b/id/10089516-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il conte di Montecristo', 25.99, 45, 'Romanzo di Alexandre Dumas', 'https://covers.openlibrary.org/b/id/10705874-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Ventimila leghe sotto i mari', 18.75, 50, 'Romanzo di Jules Verne', 'https://covers.openlibrary.org/b/id/11111697-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il ritratto di Dorian Gray', 20.50, 30, 'Romanzo di Oscar Wilde', 'https://covers.openlibrary.org/b/id/13803909-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('La metamorfosi', 14.99, 25, 'Romanzo breve di Franz Kafka', 'https://covers.openlibrary.org/b/id/5283981-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Vita e opinioni di Tristram Shandy', 16.99, 50, 'Romanzo di Laurence Sterne', 'https://covers.openlibrary.org/b/id/252171-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il codice Da Vinci', 21.99, 55, 'Romanzo di Dan Brown', 'https://covers.openlibrary.org/b/id/12775467-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Guerra e pace', 28.50, 60, 'Romanzo di Lev Tolstoj', 'https://covers.openlibrary.org/b/id/13881290-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il cacciatore di aquiloni', 19.75, 40, 'Romanzo di Khaled Hosseini', 'https://covers.openlibrary.org/b/id/12641942-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('La solitudine dei numeri primi', 17.50, 30, 'Romanzo di Paolo Giordano', 'https://covers.openlibrary.org/b/id/12942905-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Lo Hobbit', 16.99, 35, 'Romanzo di J.R.R. Tolkien', 'https://covers.openlibrary.org/b/id/13169682-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il ladro di libri', 15.99, 50, 'Romanzo di Markus Zusak', 'https://www.ibs.it/images/9788893234900_0_424_0_75.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il trono di spade', 30.99, 45, 'Primo libro della saga di George R.R. Martin', 'https://covers.openlibrary.org/b/id/12568143-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il leone, la strega e l''armadio', 18.99, 25, 'Primo libro delle Cronache di Narnia di C.S. Lewis', 'https://covers.openlibrary.org/b/id/11408073-L.jpg');

INSERT INTO prodotti (nomeprodotto, prezzo, stock, descrizione, imgsource)
VALUES ('Il visconte dimezzato', 14.50, 30, 'Romanzo di Italo Calvino', 'https://covers.openlibrary.org/b/id/10848110-L.jpg');



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

INSERT INTO libri (id, autore, genere)
VALUES (8, 'Suzanne Collins', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (9, 'F. Scott Fitzgerald', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (10, 'C.S. Lewis', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (11, 'Ildefonso Falcones', 'Romanzo storico');

INSERT INTO libri (id, autore, genere)
VALUES (12, 'Ernest Hemingway', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (13, 'Frank Herbert', 'Fantascienza');

INSERT INTO libri (id, autore, genere)
VALUES (14, 'Robert Louis Stevenson', 'Avventura');

INSERT INTO libri (id, autore, genere)
VALUES (15, 'Jane Austen', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (16, 'Carlos Ruiz Zafón', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (17, 'Licia Troisi', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (18, 'Arthur Conan Doyle', 'Mistero');

INSERT INTO libri (id, autore, genere)
VALUES (19, 'Miguel de Cervantes', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (20, 'Antoine de Saint-Exupéry', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (21, 'Jules Verne', 'Avventura');

INSERT INTO libri (id, autore, genere)
VALUES (22, 'Lev Tolstoj', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (23, 'Herman Melville', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (24, 'Alexandre Dumas', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (25, 'Jules Verne', 'Avventura');

INSERT INTO libri (id, autore, genere)
VALUES (26, 'Oscar Wilde', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (27, 'Franz Kafka', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (28, 'Laurence Sterne', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (29, 'Dan Brown', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (30, 'Lev Tolstoj', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (31, 'Khaled Hosseini', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (32, 'Paolo Giordano', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (33, 'J.R.R. Tolkien', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (34, 'Markus Zusak', 'Romanzo');

INSERT INTO libri (id, autore, genere)
VALUES (35, 'George R.R. Martin', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (36, 'C.S. Lewis', 'Fantasy');

INSERT INTO libri (id, autore, genere)
VALUES (37, 'Italo Calvino', 'Romanzo');



-- DROP TABELLE

drop table utenti;
drop table admin;
drop table clienti;
drop table prodotti;
drop table libri;
drop table prodotti_clienti;