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
  addProduct(body: { idUser: number; idProduit: number; quantity: number }) {
    return this.http.post(this.urlApi + 'add-to-cart', body).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
  getpanier(idUser: number) {
    return this.http.get<Carte>(this.urlApi + 'get-cart/' + idUser);
  }
  updatePanier(body: { idUser: number; idProduit: number }) {
    return this.http.put(this.urlApi + 'update-cart', body).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
  getTransaction(idUser: number) {
    return this.http.get<Carte>(this.urlApi + 'get-orders/' + idUser);
  }
  confirmPurchase(body: { carte: Carte }) {
    return this.http.put(this.urlApi + 'confirm-purchase', body).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
  deletePanier(idUser: number) {
    return this.http.delete(this.urlApi + 'delete-cart/' + idUser).pipe(
      tap(() => {
        // Émettre un événement de mise à jour du panier après l'ajout réussi
        this.cartUpdateSubject.next();
      })
    );
  }
}
