import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produit } from 'src/app/model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  apiUrl: string = 'http://127.0.0.1:9090/produit/';
  constructor(private http: HttpClient) {}
  getProductsByCategorieId(id: number) {
    return this.http.get<Produit[]>(this.apiUrl + 'categorie/' + id);
  }
  getProductById(id: number) {
    return this.http.get<Produit>(this.apiUrl + id);
  }
  getAllProducts() {
    return this.http.get<Produit[]>(this.apiUrl);
  }
  updateProduct(id: number, body: FormData) {
    return this.http.patch(this.apiUrl + id, body);
  }

  addProduct(body: FormData) {
    return this.http.post(this.apiUrl, body);
  }
  deleteProduct(id: number) {
    return this.http.delete(this.apiUrl + id);
  }
}
