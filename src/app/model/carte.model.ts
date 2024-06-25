import { Produit } from './produit.model';

export interface Carte {
  _id: number;
  user: number;
  items: {
    _id: number;
    product: Produit;
    quantity: number;
    status: string;
    purchaseDate: Date;
  }[];
  totalAmount: number;
}
