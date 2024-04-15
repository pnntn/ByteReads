import { Component, Input } from '@angular/core';
import { Libro } from 'src/models/Libro';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() libro?: Libro;
}
