import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carte } from 'src/app/model/carte.model';
import { Produit } from 'src/app/model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  urlApi: string = 'http://127.0.0.1:9090/carte/';

  constructor(private http: HttpClient) {}
  addProduct(body: { idClient: number; idProduit: number; quantity: number }) {
    return this.http.post(this.urlApi + 'add-to-cart', body);
  }
  getpanier(idClient: number) {
    return this.http.get<Carte>(this.urlApi + 'get-cart/' + idClient);
  }
  updatePanier(body: { idClient: number; idProduit: number }) {
    return this.http.put(this.urlApi + 'update-cart', body);
  }
  getTransaction(idClient: number) {
    return this.http.get<Carte>(this.urlApi + 'get-orders/' + idClient);
  }
  confirmPurchase(body: { carte: Carte }) {
    return this.http.put(this.urlApi + 'confirm-purchase', body);
  }
}
