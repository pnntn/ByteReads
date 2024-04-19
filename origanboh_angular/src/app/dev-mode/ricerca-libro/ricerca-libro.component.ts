import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { Libro } from 'src/models/Libro';

@Component({
  selector: 'app-ricerca-libro',
  templateUrl: './ricerca-libro.component.html',
  styleUrls: ['./ricerca-libro.component.css'],
})
export class RicercaLibroComponent {
  ricercaNome?: string;
  libri?: Libro[];
  @Output() search = new EventEmitter<Libro[]>();

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getLibriByName() {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      token = '';
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token as string,
    });

    if (this.ricercaNome == null) {
      this.ricercaNome = '';
    }

    const params = new HttpParams().set('nomeprodotto', this.ricercaNome);

    this.http
      .get<Libro[]>('http://localhost:8080/api/libro/searchByName', {
        headers,
        params,
      })
      .subscribe((risposta) => {
        this.libri = risposta;
        this.search.emit(this.libri);
      });
  }

  reset() {
    this.ricercaNome = '';
    this.getAllLibri();
  }

  getAllLibri() {
    let token = sessionStorage.getItem('token');
    if (token == null) {
      token = '';
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      token: token,
    });

    this.http
      .get<Libro[]>('http://localhost:8080/api/libro/all', { headers })
      .subscribe((risposta) => {
        this.libri = risposta;
        this.search.emit(this.libri);
      });
  }
}
