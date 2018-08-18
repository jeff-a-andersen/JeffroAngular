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
  isAdmin = new BehaviorSubject<boolean>(false);


  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin$ = this.isAdmin.asObservable();
    // this.userService
    //   .getCurrent()
    //   .pipe()
    //   .subscribe(user => {
    //     this.isAdmin.next(this.hasRole('ROLE_ADMIN', user));
    //     // this.isAdmin = new BehaviorSubject<boolean>(
    //     //   this.hasRole('ROLE_ADMIN', user)
    //     // );


    //     // this.isAdmin$.next(this.hasRole('ROLE_ADMIN', user));
    //   });
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
