import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css'],
})
export class CampaignComponent implements OnInit {
  placeholder: Campaign = new Campaign('Name', '...');
  add: string = 'add';

  constructor(
    private campaignService: CampaignService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {}

  onSave(newCampaign: Campaign) {
    this.campaignService.saveCampaign(newCampaign).subscribe(
      (response) => {
        this.toastr.success(response.text);
      },
      (error) => {
        this.toastr.error(error.error);
      },
    );
  }
}
