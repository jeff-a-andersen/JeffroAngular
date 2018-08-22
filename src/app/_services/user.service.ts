import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { Observable, BehaviorSubject } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private admin = new BehaviorSubject<boolean>(false); // {1}
  private userCurrent = new BehaviorSubject<User>(new User());

  get isAdmin() {
    return this.admin.asObservable(); // {2}
  }

  setAdmin(admin: boolean) {
    this.admin.next(admin);
  }

  get getCurrentUser() {
    return this.userCurrent.asObservable();
  }

  setCurrentUser(user: User) {
    this.userCurrent.next(user);
  }

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:8090/user');
  }

  getCurrent() {
    return this.http.get<User>('http://localhost:8090/user/current');
  }

  getCurrent2() {
    return this.http
      .get<User>('http://localhost:8090/user/current')
      .subscribe((user: User) => {
        // login successful if there's a jwt token in the response

        const hasAdminRole: boolean = this.hasRole('ROLE_ADMIN', user);

        this.admin.next(hasAdminRole);
        this.userCurrent.next(user);
        // this.setCurrentUser(user);
      });
  }

  updateCurrent(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8090/user/current', user);
  }

  private hasRole(roleName: String, user: User): boolean {
    let result = false;
    user.roles.forEach(function(role) {
      if (role.code === roleName) {
        result = true;
        return;
      }
    });
    return result;
  }
}
