import { Prodotto } from './Prodotto';

export interface Libro extends Prodotto {
  autore: string;
  genere: string;
  descrizione: string;
  ImgSource: string;
}
