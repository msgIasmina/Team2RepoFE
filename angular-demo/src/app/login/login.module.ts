import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "./services/login.service";
import { FirstLoginComponent } from './components/first-login/first-login.component';
import {MatButtonModule} from "@angular/material/button";


import {LoginRoutingModule} from "./login-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    FirstLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    MatButtonModule
  ], providers: [
    LoginService
  ]
})
export class LoginModule { }
