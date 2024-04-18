import { Component, OnInit, OnDestroy } from '@angular/core';
import { Libro } from 'src/models/Libro';
import { CarrelloItem } from 'src/models/CarrelloItem';
import { Subscription } from 'rxjs';
import { CarrelloService } from '../services/carrello.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  active: boolean = false;
  carrello: CarrelloItem[] = [];
  carrelloSubscription!: Subscription;

  constructor(
    private carrelloService: CarrelloService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carrelloSubscription = this.carrelloService
      .getCarrello()
      .subscribe((carrello) => {
        this.carrello = carrello;
      });
  }

  ngOnDestroy(): void {
    this.carrelloSubscription.unsubscribe();
  }

  apriCarrello() {
    this.active = !this.active;
  }

  decrementaQuantita(item: CarrelloItem) {
    if (item.quantita > 1) {
      this.carrelloService.decrementaQuantita(item.libro);
    }
  }

  incrementaQuantita(item: CarrelloItem) {
    this.carrelloService.incrementaQuantita(item.libro);
  }

  rimuoviDalCarrello(item: CarrelloItem) {
    this.carrelloService.rimuoviDalCarrello(item.libro);
  }

  calcolaTotale(): number {
    return this.carrelloService.calcolaTotale();
  }

  vaiAlCheckout() {
    this.router.navigate(['/checkout']);
    this.active = !this.active;
  }
}
