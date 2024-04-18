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
    this.submitInserisciOrdine();
    for (let i = 0; i < this.carrello.length; i++) {
      this.rimuoviDalCarrello(this.carrello[i]);
    }
  }

  submitInserisciOrdine() {
    // Estrai l'ID cliente dal token di sessione
    const idCliente = sessionStorage.getItem('token')?.split('-')[1];

    // Se l'ID cliente non è disponibile, esci dalla funzione
    if (!idCliente) {
      console.error('ID cliente non disponibile');
      return;
    }

    // Cicla attraverso gli elementi nel carrello
    for (let i = 0; i < this.carrello.length; i++) {
      const prodotto = this.carrello[i];

      // Costruisci l'oggetto da inviare nel body della richiesta
      const bodyObj = {
        idCliente: idCliente,
        idProdotto: prodotto.libro.id,
        dataacquisto: new Date().toISOString().slice(0, 10), // Ottieni la data corrente nel formato "YYYY-MM-DD"
        quantita: prodotto.quantita,
      };

      // Converti l'oggetto in formato JSON
      const body = JSON.stringify(bodyObj);

      // Ottieni il token di sessione
      let token = sessionStorage.getItem('token') || '';

      // Imposta l'header della richiesta
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        token: token,
      });

      // Effettua la richiesta HTTP per inserire l'ordine nel database
      this.http
        .post<CarrelloItem>(
          'http://localhost:8080/api/clienteprodotto/insert',
          body,
          { headers }
        )
        .subscribe((risposta) => {
          if (!risposta) {
            alert("Errore durante l'esecuzione della richiesta");
          } else {
            alert('Invio avvenuto con successo');
          }
        });
    }
  }
}
