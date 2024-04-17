import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-ricerca-cliente',
  templateUrl: './ricerca-cliente.component.html',
  styleUrls: ['./ricerca-cliente.component.css']
})
export class RicercaClienteComponent {
  ricercaCognome? : string;
  clienti? : Cliente[];
  @Output() search = new EventEmitter<Cliente[]>();

  constructor(private http : HttpClient){
    this.http = http;
  }

  getClientiByLastName(){
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

    if(this.ricercaCognome == null){
      this.ricercaCognome = "";
    }

    const params = new HttpParams().set('cognome', this.ricercaCognome);

    this.http.get<Cliente[]>("http://localhost:8080/api/cliente/searchByLastName", {headers, params}).subscribe(risposta =>{
      this.clienti = risposta;
      this.search.emit(this.clienti);
    })
  }

  reset(){
    this.ricercaCognome = "";
    this.getAllClienti()
  }

  getAllClienti(){
    let token = sessionStorage.getItem("token");
    if(token == null){
      token = "";
    }
    
    const headers = new HttpHeaders(
      {
        'Content-Type' : 'application/json',
        'token' : token,
      }
    )

    this.http.get<Cliente[]>("http://localhost:8080/api/cliente/all", {headers}).subscribe(risposta =>{
      this.clienti = risposta;
      this.search.emit(this.clienti);
    })
  }

}
