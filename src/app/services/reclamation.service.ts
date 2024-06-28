import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Reclamation } from '../models/reclamation';
import { CategorieReclamation } from '../models/categorie-reclamation';


@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  baseUrl: string = 'http://localhost:9090/'; 

  constructor(
    private http: HttpClient
  ) { }


    //CRUD Reclamation:
    apiUrlReclamations: string = this.baseUrl + 'reclamations/'; 



    getReclamation(): Observable<Reclamation[]>{
      return this.http.get<Reclamation[]>(this.apiUrlReclamations);
    }

    getReclamationById(id: string): Observable<Reclamation[]> {
        return this.http.get<Reclamation[]>(this.apiUrlReclamations + id);
    }

    getReclamationByIdRec(id: string): Observable<Reclamation> {
      return this.http.get<Reclamation>(this.apiUrlReclamations+ "rec/" + id);
  }

    addReclamation(reclamation: FormData): Observable<void> {
      return this.http.post<void>(this.apiUrlReclamations, reclamation);
    }

    updateReclamation(reclamation: FormData, id: string){
      return this.http.patch<void>(this.apiUrlReclamations + id, reclamation);
    }

    updateReclamationPatch(id: string, obj: object){
      return this.http.patch<void>(this.apiUrlReclamations + id, obj);
    }

    deleteReclamation(id: string): Observable<void> {
      return this.http.delete<void>(this.apiUrlReclamations + id);
    }



    //CRUD categorieReclamation:
    apiUrlCategoRec: string = this.baseUrl + 'categorieReclamations/';

    getCategorieRec(): Observable<CategorieReclamation[]> {
      return this.http.get<CategorieReclamation[]>(this.apiUrlCategoRec);
    }





}
