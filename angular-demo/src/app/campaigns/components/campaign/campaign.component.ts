import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  placeholder: Campaign = new Campaign('Name', '...');
  add: string = 'add';

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {}

  onSave(newCampaign: Campaign) {
    this.campaignService.saveCampaign(newCampaign).subscribe();
  }
}
