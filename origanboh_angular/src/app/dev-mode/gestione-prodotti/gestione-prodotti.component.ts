import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/models/Libro';

@Component({
  selector: 'app-gestione-prodotti',
  templateUrl: './gestione-prodotti.component.html',
  styleUrls: ['./gestione-prodotti.component.css']
})
export class GestioneProdottiComponent {
  @Input() libri? : Libro[];

  formInserisciLibro : FormGroup;
  formModificaLibro : FormGroup;

  isInserisciLibro = false;
  isModificaLibro = false;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;

    this.formInserisciLibro = formBuilder.group(
      {
        nomeProdotto : "", //ovvero titolo
        autore : "",
        genere : "",
        prezzo : "",
        stock : "",
        descrizione : "",
        ImgSource : ""
      }
    )

    this.formModificaLibro = formBuilder.group(
      {
        id : "",
        nomeProdotto : "", //ovvero titolo
        autore : "",
        genere : "",
        prezzo : "",
        stock : "",
        descrizione : "",
        ImgSource : ""
      }
    )

    this.getAllLibri();
  }

  getAllLibri() {
    let token = 'ADMIN-1';
    //TODO- STO USANDO UN TOKEN TEMPORANEO SOLO PER FARLO PARTIRE INTANTO
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });
    this.http
      .get<Libro[]>('http://localhost:8080/api/libro/all', { headers })
      .subscribe((risposta) => {
        this.libri = risposta;
      });
  }

  deleteLibro(id : number){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token as string
      }
    );

    const params = new HttpParams().set('idLibro', id);

    this.http.get<boolean>("http://localhost:8080/api/libro/delete", {headers, params}).subscribe(risposta =>{
      if(risposta){
        alert("Libro eliminato con successo");

        let pos = this.libri?.findIndex(x => x.id === id)
        if(pos! > -1){
          this.libri?.splice(pos!, 1);
        }
      }
    })
  }

  toggleInserisciLibro(){
    this.isInserisciLibro = !this.isInserisciLibro;
  }

  toggleModificaLibro(){
    this.isModificaLibro = !this.isModificaLibro;
  }

  modificaLibro(libro : Libro){
    this.formModificaLibro.patchValue(
      {
        id : libro.id,
        nomeProdotto : libro.nomeProdotto,
        autore : libro.autore,
        genere : libro.genere,
        prezzo : libro.prezzo,
        stock : libro.stock,
        descrizione : libro.descrizione,
        ImgSource : libro.ImgSource
      }
    );

    this.isModificaLibro = true;
  }

  submitModificaLibro(){
    const formValues = this.formModificaLibro.value;
    const body = JSON.stringify(formValues);
    console.log("body update: ", body)
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token as string
      }
    );

    this.http.post<boolean>("http://localhost:8080/api/libro/update", body, {headers}).subscribe(risposta =>{
      if(risposta){
        alert("Modifica avvenuta con successo");
        var libr : Libro = JSON.parse(body) as Libro;
        console.log("libr update", libr);

        var pos = this.libri?.findIndex(x => x.id == libr.id) as number;
        this.libri?.splice(pos, 1, libr);
      }
      else{
        alert("Errore dureante la richiesta di modifica");
      }
    })
  }

  submitInserisciLibro(){
    const formValues = this.formInserisciLibro.value;
    const body = JSON.stringify(formValues);

    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token': token as string
      }
    );

    this.http.post<Libro>("http://localhost:8080/api/libro/insert", body, {headers}).subscribe(risposta =>{
      if(!risposta){
        alert("Errore durante l'esecuzione della richiesta");
      }
      else{
        this.libri?.push(risposta);
      }

      this.formInserisciLibro.patchValue(
        {
          nomeProdotto : "", //ovvero titolo
          autore : "",
          genere : "",
          prezzo : "",
          stock : "",
          descrizione : "",
          ImgSource : ""
        }
      )

      this.toggleInserisciLibro();
    })
  }

  searchCallback(libri : Libro[]){
    this.libri = libri;
  }
}
