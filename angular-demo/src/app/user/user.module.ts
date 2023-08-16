import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/user-list/user-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {MatChipsModule} from "@angular/material/chips";
import {UserService} from "./services/user-service.service";


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserRegisterComponent
  ],
  exports: [
    //UserService ::should be deleted
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatChipsModule
  ]
})
export class UserModule { }
