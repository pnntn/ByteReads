import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-customerarea',
  templateUrl: './customerarea.component.html',
  styleUrls: ['./customerarea.component.css']
})
export class CustomerareaComponent {

  cliente? : Cliente;

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
          'role' : 'CLIENTE'
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
          this.getCliente(id);
        }
      })

    }
  }

  getCliente(id : string){
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
    
      this.cliente = risposta as Cliente;

      console.log(this.cliente);
    })

  }

  logout(){
    sessionStorage.clear();
    window.location.href="/";
  }

}
