import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    users: User[] = [];

    isLoggedIn$: Observable<boolean>;

    constructor(private userService: UserService, private authService: AuthenticationService) {}

    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}
