import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'auth-token';
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  httpClient = inject(HttpClient);

  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  login(credentials: { email: string; password: string }) {
    return this.httpClient.post('http://localhost:3000/auth/login', {email: credentials.email, password:credentials.password});
  }

  logout() {
    localStorage.removeItem(this.authTokenKey);
    this._isLoggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }
}
