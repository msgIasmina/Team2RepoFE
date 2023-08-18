import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationComponent} from "./components/donation/donation.component";
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {DonationFormComponent} from "./components/donation-form/donation-form.component";
import {UpdateDonationComponent} from "./components/update-donation/update-donation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DonationRoutingModule} from "./donation-routing.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DonationListComponent,
    DonationComponent,
    DonationFormComponent,
    UpdateDonationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DonationRoutingModule,
    MatButtonModule
  ]
})
export class DonationsModule { }
