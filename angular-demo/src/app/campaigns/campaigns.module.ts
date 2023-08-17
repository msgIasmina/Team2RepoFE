import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './components/campaign/campaign.component';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {CampaignService} from "./services/campaign.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    CampaignComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
    MatButtonModule
  ], providers: [
    CampaignService
  ]
})
export class CampaignsModule { }
