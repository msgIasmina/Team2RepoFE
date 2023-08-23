import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationComponent} from "./components/donation/donation.component";
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {MatIconModule} from "@angular/material/icon";
import {DonationRoutingModule} from "./donation-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatPaginatorModule} from "@angular/material/paginator";



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
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  exports: [
    DonationListComponent
  ]
})
export class DonationsModule { }
