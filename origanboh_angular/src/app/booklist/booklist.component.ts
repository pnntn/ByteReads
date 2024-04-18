import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Libro } from 'src/models/Libro';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
})
export class BooklistComponent {
  libri?: Libro[];

  constructor(private http: HttpClient) {
    this.http = http;
    this.getAllLibri();
  }

  getAllLibri() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.http
      .get<Libro[]>('http://localhost:8080/api/libro/all', { headers })
      .subscribe((risposta) => {
        this.libri = risposta;
      });
  }

  searchCallback(libri : Libro[]){
    this.libri = libri;
  }
  
}
