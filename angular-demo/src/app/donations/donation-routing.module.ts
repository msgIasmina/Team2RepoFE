import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UpdateDonationComponent} from "./components/update-donation/update-donation.component";
import {DonatorListComponent} from "../donator/components/donator-list/donator-list.component";
import {AddDonationComponent} from "./components/add-donation/add-donation.component";
import {DonationListComponent} from "./components/donation-list/donation-list.component";

const routes: Routes = [
  {path: 'update/:id', component:UpdateDonationComponent},
  {path: 'register', component:AddDonationComponent},
  { path: 'list', component: DonationListComponent}
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
