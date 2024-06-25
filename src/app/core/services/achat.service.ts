import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produit } from 'src/app/model/produit.model';

@Injectable({
  providedIn: 'root',
})
export class AchatService {
  constructor(private http: HttpClient) {}
  apiUrl: string = 'http://127.0.0.1:9090/categorie/';
  addAchat(achat: any) {
    return this.http.post(this.apiUrl, achat);
  }
  getAchatByClient(id: number) {
    return this.http.get<any>(this.apiUrl + 'client/' + id);
  }
  removeProductFromAchat(idAchat: number, idProduit: number): Observable<any> {
    return this.http.delete(this.apiUrl + 'deleteIn' + idAchat + idProduit);
  }
}
