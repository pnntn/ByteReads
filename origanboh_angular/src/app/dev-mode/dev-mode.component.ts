import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Utente } from 'src/models/Utente';

@Component({
  selector: 'app-dev-mode',
  templateUrl: './dev-mode.component.html',
  styleUrls: ['./dev-mode.component.css']
})
export class DevModeComponent {

  utente?: Utente;

  constructor(private http : HttpClient){
    this.http = http;
    this.checkLogin();
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
