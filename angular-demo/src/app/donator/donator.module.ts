import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatorRegisterComponent } from './components/donator-register/donator-register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DonatorRoutingModule} from "./donator-routing.module";



@NgModule({
  declarations: [
    DonatorRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DonatorRoutingModule
  ]
})
export class DonatorModule { }
