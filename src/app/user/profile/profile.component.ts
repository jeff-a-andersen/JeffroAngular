import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService } from '../../_services';
import { FormGroup } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  submitted = false;
  loading = false;
  profileForm: FormGroup;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getCurrent().subscribe(user => {
      this.user = user;
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
const username = this.profileForm.controls['username'].value;
    alert(username);

    this.loading = true;
  }
}
