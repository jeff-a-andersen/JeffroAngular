import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  user: User;
  submitted = false;
  loading = false;
  strongPassword = false;
  profileForm: FormGroup;
  error = '';

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
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }

  onPasswordStrengthChanged(strength) {
    console.log('====================================');
    console.log('onPasswordStrengthChanged', strength);
    console.log('====================================');
    if (strength === 4) {
      this.strongPassword = true;
    } else {
      this.strongPassword = false;
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    const newPwd = this.profileForm.controls['newPassword'].value;
    const newPwdConf = this.profileForm.controls['newPasswordConfirm'].value;

    const user: User = new User();

    if (newPwd) {
      if (!newPwdConf) {
        this.error = '"Confirm New Password" is missing.';
        this.loading = false;
        return;
      } else if (newPwd !== newPwdConf) {
        this.error =
          'The "New Password" and "Confirm New Password" values do NOT match.';
        this.loading = false;
        return;
      } else if (this.strongPassword === false) {
        this.error = 'The "New Password" is not strong enough.';
        this.loading = false;
        return;
      } else {
        user.newPassword = this.profileForm.controls['newPassword'].value;
      }
    }

    user.username = this.profileForm.controls['username'].value;
    user.firstName = this.profileForm.controls['firstName'].value;
    user.lastName = this.profileForm.controls['lastName'].value;
    user.confirmPassword = this.profileForm.controls['currentPassword'].value;

    // https://github.com/antoantonyk/password-strength-meter

    this.userService.updateCurrent(user).subscribe(
      userUpd => {
        this.user = userUpd;
        this.loading = false;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );

    this.loading = true;
  }
}
