import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonatorRegisterComponent} from "./components/donator-register/donator-register.component";

const routes: Routes = [
  {path: 'register-donator', component: DonatorRegisterComponent}
]
//TODO: rutare la management?

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], exports: [
    RouterModule
  ]
})
export class DonatorRoutingModule { }
