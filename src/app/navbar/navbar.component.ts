import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services';
import { User } from '../_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin$: Observable<boolean>; // = new BehaviorSubject<boolean>(false);
  firstName: String;
  lastName: String;
  private admin = new BehaviorSubject<boolean>(false);

  get isAdmin() {
    return this.admin.asObservable(); // {2}
  }

  setAdmin(admin: boolean) {
    this.admin.next(admin);
  }

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.userService.isAdmin; // this.isAdmin; // this.admin.asObservable();
    this.userService.getCurrent2();

    this.userService.getCurrentUser.subscribe(user => {
      if (user.id) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      }
    });
  }

  hasRole(roleName: String, user: User): boolean {
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
