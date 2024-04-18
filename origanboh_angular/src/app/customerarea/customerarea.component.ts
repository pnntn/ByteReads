import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarrelloItem } from 'src/models/CarrelloItem';
import { Cliente } from 'src/models/Cliente';

@Component({
  selector: 'app-customerarea',
  templateUrl: './customerarea.component.html',
  styleUrls: ['./customerarea.component.css'],
})
export class CustomerareaComponent {
  cliente?: Cliente;
  storicoAcquisti?: any;

  constructor(private http: HttpClient) {
    this.http = http;
    this.checkLogin();
  }

  checkLogin() {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      alert('NON HAI EFFETTUATO UN LOGIN VALIDO');
      sessionStorage.clear();
      window.location.href = '/';
      return;
    } else {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token: token,
        role: 'CLIENTE',
      });

      this.http
        .get('http://localhost:8080/api/login/checklogin', { headers })
        .subscribe((risposta) => {
          let check = risposta as boolean;
          if (!check) {
            alert('Non sei autorizzato ad accedere a questa pagina');
            window.location.href = '/';
          } else {
            let id = token?.split('-')[1] as string;
            this.getCliente(id);
            this.getStoricoAcquisti(id);
          }
        });
    }
  }

  getCliente(id: string) {
    let token = sessionStorage.getItem('token');

    if (token == null) {
      token = '';
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });

    const params = new HttpParams().set('idCliente', id);

    this.http
      .get('http://localhost:8080/api/cliente/byId', { headers, params })
      .subscribe((risposta) => {
        this.cliente = risposta as Cliente;
      });
  }

  getStoricoAcquisti(idCliente: string) {
    let token = sessionStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });

    const params = new HttpParams().set('idCliente', idCliente);

    this.http
      .get<CarrelloItem[]>(
        'http://localhost:8080/api/clienteprodotto/byIdCliente',
        { headers, params }
      )
      .subscribe((rispostaStorico) => {
        this.storicoAcquisti = rispostaStorico;
      });
  }

  keys(obj: any): string[] {
    return Object.keys(obj);
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '/';
  }
}

//TODO: fare il get per ogni libro
