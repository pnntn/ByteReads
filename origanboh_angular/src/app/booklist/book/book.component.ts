import { Component, Input } from '@angular/core';
import { Libro } from 'src/models/Libro';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() libro?: Libro;

  constructor(private router: Router) {}

  openBookDetail(libro?: Libro) {
    if (libro) {
      this.router.navigate(['byId'], { queryParams: { idLibro: libro.id } });
    }
  }
}
