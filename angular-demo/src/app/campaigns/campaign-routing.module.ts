import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CampaignDetailsComponent} from "./components/campaign-details/campaign-details.component";
import {CampaignListComponent} from "./components/campaign-list/campaign-list.component";
import {CampaignComponent} from "./components/campaign/campaign.component";

const routes: Routes = [
   {path:"details",component:CampaignDetailsComponent},
   {path:"listing",component:CampaignListComponent},
   {path:"add",component:CampaignComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
