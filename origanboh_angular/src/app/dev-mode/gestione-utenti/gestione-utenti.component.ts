import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/models/Cliente';
import { Utente } from 'src/models/Utente';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent {
  @Input() clienti? : Cliente[];

  utente?: Utente;

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;
    this.checkLogin();
    this.getAllClienti();
  }

  getAllClienti(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token as string
    });
    this.http
      .get<Cliente[]>('http://localhost:8080/api/cliente/all', { headers })
      .subscribe((risposta) => {
        this.clienti = risposta;
      });
  }

  deleteCliente(id : number){
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

    const params = new HttpParams().set('idCliente', id);

    this.http.get<boolean>("http://localhost:8080/api/cliente/delete", {headers, params}).subscribe(risposta =>{
      if(risposta){
        alert("Cliente eliminato con successo");

        let pos = this.clienti?.findIndex(x => x.id === id)
        if(pos! > -1){
          this.clienti?.splice(pos!, 1);
        }
      }
    })
  }

  searchCallback(clienti : Cliente[]){
    this.clienti = clienti;
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
