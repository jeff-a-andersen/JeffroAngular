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
    // this.isLoggedIn$.subscribe(data => {
    //   console.log('this.isLoggedIn$=[' + data + ']');
    // });
    // this.isAdmin$.subscribe(data => {
    //   console.log('this.isAdmin$=[' + data + ']');
    // });
    // this.userService.getCurrent();

    // this.userService
    //   .getCurrent()
    //   .pipe()
    //   .subscribe(user => {
    //     console.log('Jeffro');
    //     this.setAdmin(this.hasRole('ROLE_ADMIN', user));
    //     this.isAdmin$ = this.isAdmin;
    //     // this.admin.next(this.hasRole('ROLE_ADMIN', user));
    //     // console.log('this.isAdmin=[' + this.isAdmin.value + ']');
    //     // console.log('this.isAdmin$=[' + this.isAdmin$ + ']');

    //     // this.isAdmin = new BehaviorSubject<boolean>(
    //     //   this.hasRole('ROLE_ADMIN', user)
    //     // );
    //     // this.isAdmin$ = this.isAdmin.asObservable();

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
