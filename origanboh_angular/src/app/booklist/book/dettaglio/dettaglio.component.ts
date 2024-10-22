import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/models/Libro';
import { CarrelloService } from 'src/app/services/carrello.service';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css'],
})
export class DettaglioComponent implements OnInit {
  libro?: Libro;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private CarrelloService: CarrelloService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['idLibro'];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (id) {
      this.http
        .get<Libro>('http://localhost:8080/api/libro/byId?idLibro=' + id, {
          headers,
        })
        .subscribe(
          (libro) => {
            this.libro = libro;
          },
          (error) => {
            console.error('Errore nel recupero del libro:', error);
          }
        );
    }
  }

  addToCart(): void {
    if (this.libro) {
      this.CarrelloService.aggiungiAlCarrello(this.libro);
      alert('Prodotto aggiunto al carrello');
    }
  }
}
