import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {RoleListComponent} from "../permission/components/role-list/role-list.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";

const routes: Routes = [
  {path:"permissions/:id",component:RoleListComponent},
      {path:'update/:id',component:UpdateUserComponent},
      {path:'list', component:UserListComponent},
      {path:'details',component: UserDetailsComponent},
      {path: 'register', component: UserRegisterComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
