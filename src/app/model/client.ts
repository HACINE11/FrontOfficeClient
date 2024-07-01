import { Categorieclient } from './categorieclient';

export class Client {
  _id!: string;
  nom!: string;
  prenom!: string;
  email!: string;
  addressePostal!: string;
  telPortable!: string;
  telFixe!: number;
  matriculeFiscale!: number;
  dateInscription!: Date;
  chiffreAffaire!: number;
  niveauSatisfaction!: number;
  statutCompte!: string;
  region!: string;
  pointFidelite!: number;
  categorieClientId!: string;
}
