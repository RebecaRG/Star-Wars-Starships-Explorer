import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  get isLoggedInObservable() {
    return this.loggedIn.asObservable();
  }

  private checkLoginStatus(): boolean {
    return !!localStorage.getItem('userToken');
  }

  registerUser(userDetails: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<any> {
    const fakeToken = 'simulatedToken';
    localStorage.setItem('userToken', fakeToken);
    this.loggedIn.next(true);
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }

  logOut(): void {
    localStorage.removeItem('userToken');
    this.loggedIn.next(false);
  }


  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong. Please try again.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMessage = error.error || errorMessage;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
