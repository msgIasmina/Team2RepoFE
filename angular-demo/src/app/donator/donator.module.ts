import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonatorRegisterComponent } from './components/donator-register/donator-register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DonatorRoutingModule} from "./donator-routing.module";
import {DonatorFormComponent} from "./components/donator-form/donator-form.component";
import {DonatorDetailsComponent} from "./components/donator-details/donator-details.component";
import {UpdateDonatorComponent} from "./components/update-donator/update-donator.component";
import {DonatorListComponent} from "./components/donator-list/donator-list.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    DonatorListComponent,
    DonatorRegisterComponent,
    DonatorDetailsComponent,
    DonatorFormComponent,
    UpdateDonatorComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DonatorRoutingModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class DonatorModule { }
