import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatMenuModule,
  MatIconModule,
  MatDividerModule,
  MatGridListModule,
  MatInputModule
} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SettingComponent } from './user/setting/setting.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    PasswordStrengthMeterModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    SettingComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
