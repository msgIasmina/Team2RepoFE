import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignService } from './services/campaign.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { CampaignListComponent } from './components/campaign-list/campaign-list.component';
import { CampaignFrmComponent } from './components/campaign-frm/campaign-frm.component';
import { CampaignEditComponent } from './components/campaign-edit/campaign-edit.component';
import { CampaignComponent } from './components/campaign/campaign.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    CampaignComponent,
    CampaignDetailsComponent,
    CampaignListComponent,
    CampaignFrmComponent,
    CampaignEditComponent,
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    TranslocoModule,
    MatIconModule,
  ],
  exports: [CampaignComponent],
  providers: [CampaignService],
})
export class CampaignsModule {}
