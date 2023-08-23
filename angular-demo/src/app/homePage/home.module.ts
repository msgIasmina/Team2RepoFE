import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./components/home/home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {CampaignsModule} from "../campaigns/campaigns.module";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CampaignsModule
  ]
})
export class HomeModule{


}
