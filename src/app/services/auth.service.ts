import { Injectable } from '@angular/core';
import { User } from '@models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  logIn(email: string, password: string): Observable<User> {
    console.log('logIn');
    return this.http.post<User>('/api/login', { email, password });
  }
}
