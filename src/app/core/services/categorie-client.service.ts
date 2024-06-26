import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Categorieclient } from 'src/app/model/categorieclient';

@Injectable({
  providedIn: 'root'
})
export class CategorieClientService {
  apiUrlcategorieClient: string = 'http://127.0.0.1:9090/categorieclient/';
  constructor(private http: HttpClient) {}
 
  addCategorieClient(categorieclientData:Categorieclient){
    return this.http.post(this.apiUrlcategorieClient,categorieclientData);
  }
  // constructor(private http: HttpClient) {}
  // addcategorieClient(categorieclient:FormData){
  //   return this.http.post(this.apiUrlcategorieClient,categorieclient);
  // }
  getcategorieclients(): Observable<Categorieclient[]> {
    return this.http.get<Categorieclient[]>(this.apiUrlcategorieClient).pipe(
      catchError(this.handleError)
    );
  }
 
 
  getcategorieClientById(id: string) {
    return this.http.get<Categorieclient>(`${this.apiUrlcategorieClient}${id}`)
  }
  updatecategorieClient(caclientId: string, updatedData: Categorieclient){
    return this.http.patch(`${this.apiUrlcategorieClient}${caclientId}`, updatedData)

  }
  
 
  // cherchercategorieClient(key: string) {
  //   return this.http.get<Categorieclient[]>(this.apiUrlcategorieClient+"search/"+key);
  // }

  deletecategorieClient(caclientId: string) {
    return this.http.delete(`${this.apiUrlcategorieClient}${caclientId}`)
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.error) {
        errorMessage += `\nDetails: ${error.error.error}`;
      }
    }
    console.error('HTTP Error:', errorMessage); // Afficher l'erreur complète dans la console
    return throwError(errorMessage);
  }
}
