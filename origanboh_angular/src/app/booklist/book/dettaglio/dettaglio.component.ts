import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Libro } from 'src/models/Libro';

@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrls: ['./dettaglio.component.css']
})
export class DettaglioComponent {

  libro?: Libro;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['idLibro'];
    if (id) {
      this.http.get<Libro>('http://localhost:8080/api/libro/byId?idLibro=' + id).subscribe((libro) => {
        this.libro = libro;
      });
    }
  }

}
