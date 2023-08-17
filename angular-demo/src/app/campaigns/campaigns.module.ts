import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './components/campaign/campaign.component';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {CampaignService} from "./services/campaign.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignDetailsComponent,
    CampaignListComponent
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
