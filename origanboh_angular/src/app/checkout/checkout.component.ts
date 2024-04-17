import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrelloItem } from 'src/models/CarrelloItem';
import { Subscription } from 'rxjs';
import { CarrelloService } from '../services/carrello.service';
import { DatiPagamento } from 'src/models/DatiPagamento';
import { Indirizzo } from 'src/models/Indirizzo';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  carrello: CarrelloItem[] = [];
  carrelloSubscription!: Subscription;

  faseRiepilogo: boolean = true;
  faseIndirizzo: boolean = false;
  fasePagamento: boolean = false;
  faseConferma: boolean = false;
  faseRiepilogoFinale: boolean = false;

  //TODO: SISTEMARE IL SISTEMA DI INDIRIZZO
  indirizzo: Indirizzo = {
    nome: '',
    indirizzo: '',
    citta: '',
    cap: '',
  };

  datiPagamento: DatiPagamento = {
    nomeCarta: '',
    numeroCarta: '',
    scadenzaCarta: '',
    cvvCarta: '',
  };

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

  passaARiepilogo() {
    this.faseRiepilogo = true;
    this.faseIndirizzo = false;
    this.fasePagamento = false;
    this.faseRiepilogoFinale = false;
    this.faseConferma = false;
  }

  passaAFaseIndirizzo() {
    this.faseRiepilogo = false;
    this.faseIndirizzo = true;
    this.fasePagamento = false;
    this.faseRiepilogoFinale = false;
    this.faseConferma = false;
  }

  passaAFasePagamento() {
    this.faseRiepilogo = false;
    this.faseIndirizzo = false;
    this.fasePagamento = true;
    this.faseRiepilogoFinale = false;
    this.faseConferma = false;
  }
  passaAFaseRiepilogoFinale() {
    this.faseRiepilogo = false;
    this.faseIndirizzo = false;
    this.fasePagamento = false;
    this.faseRiepilogoFinale = true;
    this.faseConferma = false;
  }

  passaAFaseConferma() {
    this.faseRiepilogo = false;
    this.faseIndirizzo = false;
    this.fasePagamento = false;
    this.faseRiepilogoFinale = false;
    this.faseConferma = true;
  }

  confermaPagamento() {
    console.log('Dati pagamento confermati:', this.datiPagamento);
    this.passaAFaseRiepilogoFinale();
  }

  confermaOrdine() {
    this.passaAFaseConferma();
  }
}
