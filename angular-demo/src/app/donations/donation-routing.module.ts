import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonationListComponent} from "./components/donation-list/donation-list.component";
import {UpdateDonationComponent} from "./components/update-donation/update-donation.component";
import {DonatorListComponent} from "../donator/components/donator-list/donator-list.component";

const routes: Routes = [
  {path: 'update/:id', component:UpdateDonationComponent},
  {path: ":page/:size", component:DonatorListComponent},
  // { path: 'details', component: DonationDetailsComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DonationRoutingModule { }
