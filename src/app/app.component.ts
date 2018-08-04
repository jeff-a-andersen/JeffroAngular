import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './_services/authentication.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }




}
