import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';




@Injectable({ providedIn: 'root'   })


export class AuthServiceService {


  constructor(private router: Router, private http:HttpClient){}

  




  logIn(email: string, motPasse: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signin', { email, motPasse })
     
  }
  signUp(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:9090/user/signup`, user);
  }

}
