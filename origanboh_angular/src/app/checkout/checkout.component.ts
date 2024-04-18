import { Component } from '@angular/core';
import { CarrelloItem } from 'src/models/CarrelloItem';
import { Subscription } from 'rxjs';
import { CarrelloService } from '../services/carrello.service';
import { DatiPagamento } from 'src/models/DatiPagamento';
import { Indirizzo } from 'src/models/Indirizzo';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  ordineRiuscito: boolean = false;

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
    private http: HttpClient,
    private carrelloService: CarrelloService
  ) {
    this.http = http;
  }

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
    const RuoloCliente = sessionStorage.getItem('token')?.split('-')[0];
    if (RuoloCliente === 'CLIENTE') {
      this.faseRiepilogo = false;
      this.faseIndirizzo = true;
      this.fasePagamento = false;
      this.faseRiepilogoFinale = false;
      this.faseConferma = false;
    } else {
      alert(
        "Per procedere con l'acquisto devi aver fatto il login come cliente"
      );
    }
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
    this.submitInserisciOrdine();
    for (let i = 0; i < this.carrello.length; i++) {
      this.rimuoviDalCarrello(this.carrello[i]);
    }
  }

  submitInserisciOrdine() {
    const idCliente = sessionStorage.getItem('token')?.split('-')[1];

    if (!idCliente) {
      console.error('ID cliente non disponibile');
      return;
    }

    for (let i = 0; i < this.carrello.length; i++) {
      const prodotto = this.carrello[i];

      const bodyObj = {
        idCliente: idCliente,
        idProdotto: prodotto.libro.id,
        dataacquisto: new Date().toISOString().slice(0, 10), // Ottieni la data corrente nel formato "YYYY-MM-DD"
        quantita: prodotto.quantita,
      };

      const body = JSON.stringify(bodyObj);

      let token = sessionStorage.getItem('token') || '';

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token: token,
      });

      this.http
        .post<CarrelloItem>(
          'http://localhost:8080/api/clienteprodotto/insert',
          body,
          { headers }
        )
        .subscribe((risposta) => {
          if (!risposta) {
            alert("Errore durante l'esecuzione della richiesta");
            this.ordineRiuscito = false;
          } else {
            this.ordineRiuscito = true;
          }
        });
    }
  }
}
