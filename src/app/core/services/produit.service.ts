import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  apiUrl: string = 'http://127.0.0.1:9090/produit/';
  constructor(private http: HttpClient) {}
  getProducts(id: number) {
    return this.http.get<Produit[]>(this.apiUrl + 'categorie/' + id);
  }
  getProduct(id: number) {
    return this.http.get<Produit>(this.apiUrl + id);
  }
  getAllProducts() {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  addProduct(body: FormData) {
    return this.http.post(this.apiUrl, body);
  }
}
