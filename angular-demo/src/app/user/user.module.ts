import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserListComponent} from './components/user-list/user-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {UserRoutingModule} from "./user-routing.module";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {MatChipsModule} from "@angular/material/chips";
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserFromComponent } from './components/user-from/user-from.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserService} from "./services/user-service.service";
import {TranslocoModule} from "@ngneat/transloco";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSpinner} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserRegisterComponent,
    UpdateUserComponent,
    UserFromComponent
  ],
  providers: [
    UserService
  ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule,
        TranslocoModule,
        MatPaginatorModule
    ]
})
export class UserModule { }
