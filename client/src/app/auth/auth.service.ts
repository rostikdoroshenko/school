import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenData, User } from './auth.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `http://localhost:3000/api/auth`;

  constructor(private http: HttpClient) {}

  createUser({ email, password }: User): Observable<any> {
    const user: User = {
      email,
      password,
    };
    return this.http.post(`${this.authUrl}/signup`, user);
  }

  login(user: User): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.authUrl}/login`, user);
  }
}
