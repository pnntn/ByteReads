export interface AcquistoDettagliato {
  id: number;
  idCliente: number;
  idProdotto: number;
  dataacquisto: string;
  quantita: number;
  nomeprodotto: string;
  prezzo: number;
  stock: number;
  descrizione: string;
  imgSource: string;
  autore: string;
  genere: string;
}
