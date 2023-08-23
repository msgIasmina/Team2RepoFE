import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {UpdateDonationComponent} from "./components/update-donation/update-donation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DonationRoutingModule} from "./donation-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {DonationFormComponent} from "./components/donation-form/donation-form.component";
import { AddDonationComponent } from './components/add-donation/add-donation.component';
import {DonationComponent} from "./components/donation/donation.component";
import { DonationUpdateFormComponent } from './components/donation-update-form/donation-update-form.component';

@NgModule({
  declarations: [
    DonationListComponent,
    UpdateDonationComponent,
    DonationFormComponent,
    AddDonationComponent,
    DonationComponent,
    DonationUpdateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DonationRoutingModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class DonationsModule { }
