import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonatorRegisterComponent} from "./components/donator-register/donator-register.component";

const routes: Routes = [
  {path: 'register', component: DonatorRegisterComponent}
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
export class DonatorRoutingModule { }
