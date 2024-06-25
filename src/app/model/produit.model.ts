import { CategorieProduit } from './categorie.model';

export class Produit {
  _id!: number;
  categorie!: CategorieProduit;
  nomProduit!: string;
  descriptionProduit!: string;
  prix!: number;
  quantite!: number;
  image!: string;
}
