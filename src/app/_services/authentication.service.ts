﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Observable, EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn.next(loggedIn);
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    // return this.http.post<any>('/api/authenticate', { username: username, password: password })
    return this.http
      .post<any>('http://localhost:8090/token/generate-token', {
        username: username,
        password: password
      })
      .pipe(
        // catchError(err => {
        //   if (err === 'Unauthorized') {
        //     return Observable.throw('Unauthorized');
        //     //return throwError('Unauthorized');
        //   } else {
        //     return Observable.throw('Unauthorized');
        //     // return false;
        //     // return throwError(err);
        //   }
        // })
        // catchError(val => of(`I caught: ${val}`))
        // ,

        map((res: any) => {
          // login successful if there's a jwt token in the response
          if (res && res.token) {
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ username, token: res.token })
            );
            this.loggedIn.next(true);
            // return true;
          } else {
            // return false;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
  }
}
