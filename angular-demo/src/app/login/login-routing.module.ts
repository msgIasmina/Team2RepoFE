import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FirstLoginComponent} from "./components/first-login/first-login.component";

const routes: Routes = [
  { path: 'firstLogin', component: FirstLoginComponent},
  //{ path: 'firstLogin', redirectTo: 'first-login.component', pathMatch: 'full'},
  //{ path: '', redirectTo: 'users', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
