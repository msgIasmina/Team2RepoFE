import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DonationListComponent} from "./components/donation-list/donation-list.component";

const routes: Routes = [
  { path: 'list', component: DonationListComponent},
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DonationRoutingModule { }
