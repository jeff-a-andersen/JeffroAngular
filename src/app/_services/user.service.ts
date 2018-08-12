﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:8090/user');
  }

  getCurrent() {
    return this.http.get<User>('http://localhost:8090/user/current');
  }

  updateCurrent(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8090/user/current', user);
  }
}
