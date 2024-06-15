import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorieProduit } from 'src/app/model/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class CategorieProduitService {
  apiUrl: string = 'http://127.0.0.1:9090/categorie/';
  constructor(private http: HttpClient) {}
  getCategorie() {
    return this.http.get<CategorieProduit[]>(this.apiUrl);
  }
  addCategorie(body: CategorieProduit) {
    return this.http.post(this.apiUrl, body);
  }
}
