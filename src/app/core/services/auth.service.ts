import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, throwError } from 'rxjs';

// ============================ //
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ============================ //
  constructor(private http: HttpClient, private router: Router) {}
  // ============================ //
  private url: string = 'http://localhost:3000';
  // ============================ //
  public signIn(payload: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.url}/signIn`, payload)
      .pipe(
        map((data) => {
          localStorage.removeItem('token');
          localStorage.setItem('token', data.token);
          return this.router.navigate(['admin']);
        }),
        catchError((error) => {
          if (error.error.message) return throwError(() => error.error.message);
          return throwError(
            () =>
              'No momento não estamos conseguindo validar esses dados. Tente novamente mais tarde.'
          );
        })
      );
  }
  // ============================ //
  public logout() {
    localStorage.removeItem('token');
    return this.router.navigate(['']);
  }
  // ============================ //
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      const jwtHelper = new JwtHelperService();
      return !jwtHelper.isTokenExpired(token);
    }
  }
}
