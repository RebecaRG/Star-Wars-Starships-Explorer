import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

registerUser(userDetails: User): Observable<any> {
  return this.getUserByEmail(userDetails.email).pipe(
    switchMap((users: User[]) => {
      if (users.length > 0) {
        return throwError(() => new Error('Email already in use'));
      } else {
        return this.http.post(`${this.baseUrl}/users`, userDetails).pipe(
          switchMap(() => this.login(userDetails.email, userDetails.password))
        );
      }
    })
  );
}

  

  getUserByEmail(email: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  



}
