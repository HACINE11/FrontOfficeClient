import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';




@Injectable({ providedIn: 'root'   })


export class AuthServiceService {


  constructor(private router: Router, private http:HttpClient){}

  logIn(email: string, motPasse: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signin', { email, motPasse })
     
  }
  signUp(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:9090/user/signup`, user)
    .pipe(
      map(response => {
        this.router.navigate(['/verify-email']);
        return { isOk: true };
      }),
      catchError(error => {
        return of({ isOk: false, message: "Failed to create account" });
      })
    );
  }
  verifyAccount(email: string, code: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/verify', { email, code })
      .pipe(
        map(response => {
          this.router.navigate(['/login']);
          return { isOk: true };
        }),
        catchError(error => {
          return of({ isOk: false, message: "Failed to verify account" });
        })
      );
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/forgetpassword', { email })
      .pipe(
        map(response => {
          return { isOk: true, message: 'Recovery email sent' };
        }),
        catchError(error => {
          return of({ isOk: false, message: 'Failed to reset password' });
        })
      );
  }
  changePassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/resetpassword', { token, newPassword })
      .pipe(
        map(response => {
          return { isOk: true, message: 'Password has been reset' };
        }),
        catchError(error => {
          return of({ isOk: false, message: 'Error resetting password' });
        })
      );
  }

  getUserProfile(id: string): Observable<any> 
    { 
      return this.http.get<any>('http://localhost:9090/user/' + id).pipe(map(response => response),catchError(error => 
        {console.error('Error fetching profile:', error);
          throw error;
        })    );  }


updateUserProfile(id: string, data: Partial<User>): Observable<any> {
          return this.http.put<void>(`http://localhost:9090/user/${id}`, data)
          .pipe(map(response => response),
          catchError(error => { console.error('Error updating profile:', error); throw error; }) );
         } 
}

