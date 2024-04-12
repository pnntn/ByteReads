import { Prodotto } from './Prodotto';

export interface Libro extends Prodotto {
  autore: string;
  genere: string;
}
