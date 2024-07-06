import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';




@Injectable({ providedIn: 'root'   })


export class AuthServiceService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private http:HttpClient){}

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
  logIn(email: string, motPasse: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signin', { email, motPasse })
      .pipe(
        map(response => {
          localStorage.setItem('tokenClient', response.token);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']);
          return { success: true, message: 'WELCOM TO MLIHA' };;
        }),
        catchError(error => {
          let message = 'Unknown error occurred';
          if (error.status === 404) {
            message = 'User not found';
          } else if (error.status === 400) {
            message = 'Invalid email or password, vérifier si vos coordonnées sont exactes';
          } else if (error.error.message === 'Invalid mot de passe') {
            message = 'Invalid password';
          }
          return of({ success: false, message });
        })
      );
  }


  /*logIn(email: string, motPasse: string): Observable<any> {
    return this.http.post<any>('http://localhost:9090/user/signin', { email, motPasse })
     
  }*/

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
    return this.http.post<any>('http://localhost:9090/user/forgetPasswordClient', { email })
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
          console.log("error", error);
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

logOut(): void {
          localStorage.removeItem('tokenClient');
          this.router.navigate(['/login-form']);
        }

isLoggedIn(): boolean {
          const token = localStorage.getItem('tokenClient');
          if (token) {
            try {
              const decoded: any = jwtDecode(token);
              return !!decoded; // Vérifie si le token est valide
            } catch (error) {
              console.error('Error decoding token:', error);
              return false;
            }
          }
          return false;
        }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login-form']);
      return false;
    }
  }
}

