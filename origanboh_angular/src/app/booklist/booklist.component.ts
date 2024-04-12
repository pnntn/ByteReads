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
    this.getAllClassi();
  }

  getAllClassi() {
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
}
