import { Component, OnInit, OnChanges } from '@angular/core';
import { User } from '../../_models';
import { UserService } from '../../_services';

import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  user: User;
  submitted = false;
  loading = false;
  profileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getCurrent().subscribe(user => {
      this.user = user;

      this.profileForm = this.formBuilder.group({
        username: [
          { value: '' + this.user.username, disabled: true },
          Validators.required
        ],
        firstName: ['' + this.user.firstName, Validators.required],
        lastName: ['' + this.user.lastName, Validators.required],
        currentPassword: [''],
        newPassword: [''],
        newPasswordConfirm: [null]
      });

      this.ngOnChanges();
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

    const user: User = new User();

    user.username = this.profileForm.controls['username'].value;
    user.firstName = this.profileForm.controls['firstName'].value;
    user.lastName = this.profileForm.controls['lastName'].value;
    user.password = this.profileForm.controls['newPassword'].value;
    this.loading = true;
  }

  ngOnChanges(): void {
    // this.profileForm.get('newPassword').valueChanges.subscribe(value => {
    //   const newLocal = this.profileForm.get('newPasswordConfirm');
    //   if (value) {
    //     newLocal.setValidators(Validators.required);
    //   } else {
    //     newLocal.clearValidators();
    //   }
    //   newLocal.updateValueAndValidity();
    // });
  }
}
