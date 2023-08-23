import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSliderModule} from "@angular/material/slider";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";



@NgModule({
  declarations: [
    DonationListComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [
    DonationListComponent
  ]
})
export class DonationsModule { }
