import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Carte } from 'src/app/model/carte.model';
import { Produit } from 'src/app/model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  urlApi: string = 'http://127.0.0.1:9090/carte/';
  private cartUpdateSubject = new Subject<void>();
  cartUpdated$ = this.cartUpdateSubject.asObservable();

  constructor(private http: HttpClient) {}
  addProduct(body: { idClient: number; idProduit: number; quantity: number }) {
    return this.http.post(this.urlApi + 'add-to-cart', body).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
  getpanier(idClient: number) {
    return this.http.get<Carte>(this.urlApi + 'get-cart/' + idClient);
  }
  updatePanier(body: { idClient: number; idProduit: number }) {
    return this.http.put(this.urlApi + 'update-cart', body).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
  getTransaction(idClient: number) {
    return this.http.get<Carte>(this.urlApi + 'get-orders/' + idClient);
  }
  confirmPurchase(body: { carte: Carte }) {
    return this.http.put(this.urlApi + 'confirm-purchase', body);
  }
  deletePanier(idClient: number) {
    return this.http.delete(this.urlApi + 'delete-cart/' + idClient).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
}
