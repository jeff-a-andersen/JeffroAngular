import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { UserService } from '../_services';
import { FormControl } from '@angular/forms';

@Component({ templateUrl: 'home.component.html',
styleUrls: ['./home.component.css'] })
export class HomeComponent implements OnInit {
  users: User[] = [];
  displayIframe = false;
  loaded = false;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  zohoMailLoaded() {
    try {
      const iframe: HTMLIFrameElement = <HTMLIFrameElement>document.getElementById('zoho-mail-frame');
      const src = iframe.contentWindow.location.href;
      this.displayIframe = false;
    } catch (e) {
      /**
       * We get a cross-domain exception in this case, which means requestly is running and removing the header X-Frame-Options
       */
      this.displayIframe = true;
    }
    this.loaded = true;

  }
}
