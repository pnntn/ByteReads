import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-gestione-utenti',
  templateUrl: './gestione-utenti.component.html',
  styleUrls: ['./gestione-utenti.component.css']
})
export class GestioneUtentiComponent {
  @Input() clienti? : Cliente[];

  constructor(private http : HttpClient, private formBuilder : FormBuilder){
    this.http = http;

    this.getAllClienti();
  }

  getAllClienti(){
    let token = 'ADMIN-1';
    //TODO- STO USANDO UN TOKEN TEMPORANEO SOLO PER FARLO PARTIRE INTANTO
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
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
}
