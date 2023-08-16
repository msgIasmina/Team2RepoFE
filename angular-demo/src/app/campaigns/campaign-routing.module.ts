import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CampaignComponent} from "./components/campaign/campaign.component";

const routes: Routes = [
  // {path:"campaigns",component:CampaignComponent}
];

@NgModule({
  declarations: [],
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
