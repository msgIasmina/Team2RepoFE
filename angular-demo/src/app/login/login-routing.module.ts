import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {FirstLoginComponent} from "./components/first-login/first-login.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"firstLogin",component:FirstLoginComponent}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
