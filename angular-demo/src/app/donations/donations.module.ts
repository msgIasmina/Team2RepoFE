import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationComponent} from "./components/donation/donation.component";
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {MatIconModule} from "@angular/material/icon";
import {DonationRoutingModule} from "./donation-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";



@NgModule({
  declarations: [
    DonationComponent,
    DonationListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    DonationRoutingModule,
    MatButtonModule,
    FormsModule,
    MatSliderModule
  ],
  exports: [
    DonationListComponent
  ]
})
export class DonationsModule { }
