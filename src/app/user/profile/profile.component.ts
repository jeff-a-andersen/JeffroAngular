import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService } from '../../_services';

import {
  FormGroup,
  FormBuilder,
  Validators
} from '../../../../node_modules/@angular/forms';
import { Observable, Subject } from 'rxjs';


/**
 * This component displays the current users profile and allows them to edit it.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // user: User;
  user$: Observable<User>;

  private userSubject = new Subject<User>();
  submitted = false;
  loading = false;
  /**
   * Flag to indicate if the password entered is strong or not.
   */
  strongPassword = false;
  /**
   * The form containing the user profile controls.
   */
  profileForm: FormGroup;
  /**
   * Stores the error message, if any.
   */
  error = '';

  /**
   * Stores the success message, if any.
   */
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  setUserSubject(user: User) {
    this.userSubject.next(user);
  }
  getUserSubject(): Observable<User> {
    return this.userSubject.asObservable();
  }

  ngOnInit() {
    this.userService.getCurrent2();

    this.user$ = this.userService.getCurrentUser;
    this.user$.subscribe(user => {
      if (user.id) {
        let email = '';
        if (user.email) {
          email = user.email;
        }
        this.profileForm = this.formBuilder.group({
          username: [
            { value: '' + user.username, disabled: true },
            Validators.required
          ],
          firstName: ['' + user.firstName, Validators.required],
          lastName: ['' + user.lastName, Validators.required],
          email: [email, Validators.compose(
            [Validators.email, Validators.required])],
          currentPassword: [''],
          newPassword: [''],
          newPasswordConfirm: [null]
        });
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.profileForm.controls;
  }
/**
 * Sets the strong password flag based on the strength parameter received.
 *
 * @param strength
 */
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
/**
 * Handles form submission.
 */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }

    const newPwd = this.profileForm.controls['newPassword'].value;
    const newPwdConf = this.profileForm.controls['newPasswordConfirm'].value;

    const user: User = new User();

    this.success = '';
    this.error = '';

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
    user.email = this.profileForm.controls['email'].value;
    // https://github.com/antoantonyk/password-strength-meter

    this.userService.updateCurrent(user).subscribe(
      userUpd => {
        this.success = 'Profile updated successfully.';
        this.userService.setCurrentUser(userUpd);
        // this.user = userUpd;
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
