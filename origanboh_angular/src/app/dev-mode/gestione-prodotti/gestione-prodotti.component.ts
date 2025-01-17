import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Libro } from 'src/models/Libro';
import { Utente } from 'src/models/Utente';

@Component({
  selector: 'app-gestione-prodotti',
  templateUrl: './gestione-prodotti.component.html',
  styleUrls: ['./gestione-prodotti.component.css']
})
export class GestioneProdottiComponent {
  @Input() libri? : Libro[];

  utente?: Utente;

  formInserisciLibro : FormGroup;
  formModificaLibro : FormGroup;

  isInserisciLibro = false;
  isModificaLibro = false;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;
    this.checkLogin();

    this.formInserisciLibro = formBuilder.group(
      {
        nomeprodotto : "", //ovvero titolo
        autore : "",
        genere : "",
        prezzo : "",
        stock : "",
        descrizione : "",
        imgsource : ""
      }
    )

    this.formModificaLibro = formBuilder.group(
      {
        id : "",
        nomeprodotto : "", //ovvero titolo
        autore : "",
        genere : "",
        prezzo : "",
        stock : "",
        descrizione : "",
        imgsource : ""
      }
    )
    this.getAllLibri();
  }

  getAllLibri() {
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token as string
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
    if (this.isModificaLibro) {
        this.isModificaLibro = false;
    }
    this.isInserisciLibro = !this.isInserisciLibro;
  }

  toggleModificaLibro(){
      if (this.isInserisciLibro) {
          this.isInserisciLibro = false;
      }

      this.isModificaLibro = !this.isModificaLibro;     
  }



  modificaLibro(libro : Libro){
    this.toggleModificaLibro()
    this.formModificaLibro.patchValue(
      {
        id : libro.id,
        nomeprodotto : libro.nomeprodotto,
        autore : libro.autore,
        genere : libro.genere,
        prezzo : libro.prezzo,
        stock : libro.stock,
        descrizione : libro.descrizione,
        imgsource : libro.imgsource
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
          nomeprodotto : "", //ovvero titolo
          autore : "",
          genere : "",
          prezzo : "",
          stock : "",
          descrizione : "",
          imgsource : ""
        }
      )

      this.toggleInserisciLibro();
    })
  }

  searchCallback(libri : Libro[]){
    this.libri = libri;
  }

  checkLogin(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      alert("NON HAI EFFETTUATO UN LOGIN VALIDO")
      sessionStorage.clear();
      window.location.href="/";
      return;
    }
    else{
      const headers = new HttpHeaders(
        {
          'Content-Type' : 'application/json',
          'token' : token,
          'role' : 'ADMIN'
        }
      );


      this.http.get("http://localhost:8080/api/login/checklogin", {headers}).subscribe(risposta =>{
        let check = risposta as boolean;
        if(!check){
          alert("Non sei autorizzato ad accedere a questa pagina");
          window.location.href="/";
        }
        else{
          let id  = token?.split("-")[1] as string;
          this.getUtente(id);
        }
      })

    }
  }

  getUtente(id : string){
    let token = sessionStorage.getItem("token");

    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token
      }
    )

    const params = new HttpParams().set('idCliente', id);

    this.http.get("http://localhost:8080/api/cliente/byId", {headers, params},).subscribe(risposta =>{
      console.log(risposta);
    
      this.utente = risposta as Utente;

      console.log(this.utente);
    })

  }

}
