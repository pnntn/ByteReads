import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Libro } from 'src/models/Libro';
import { CarrelloItem } from 'src/models/CarrelloItem';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  private carrello: CarrelloItem[] = [];
  private carrelloSubject = new BehaviorSubject<CarrelloItem[]>([]);

  constructor() {}

  getCarrello() {
    return this.carrelloSubject.asObservable();
  }

  aggiungiAlCarrello(libro: Libro) {
    const index = this.carrello.findIndex((item) => item.libro.id === libro.id);

    if (index !== -1) {
      this.carrello[index].quantita++;
    } else {
      this.carrello.push({ libro: libro, quantita: 1 });
    }

    this.carrelloSubject.next([...this.carrello]);
  }

  rimuoviDalCarrello(libro: Libro) {
    const index = this.carrello.findIndex((item) => item.libro.id === libro.id);

    if (index !== -1) {
      this.carrello.splice(index, 1);

      this.carrelloSubject.next([...this.carrello]);
    }
  }

  incrementaQuantita(libro: Libro) {
    const index = this.carrello.findIndex((item) => item.libro.id === libro.id);

    if (index !== -1) {
      this.carrello[index].quantita++;
      this.carrelloSubject.next([...this.carrello]);
    }
  }

  decrementaQuantita(libro: Libro) {
    const index = this.carrello.findIndex((item) => item.libro.id === libro.id);

    if (index !== -1 && this.carrello[index].quantita > 1) {
      this.carrello[index].quantita--;
      this.carrelloSubject.next([...this.carrello]);
    }
  }

  calcolaTotale(): number {
    const totale = this.carrello.reduce(
      (acc, item) => acc + item.libro.prezzo * item.quantita,
      0
    );
    return Number(totale.toFixed(2));
  }
}
