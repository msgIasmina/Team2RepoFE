import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent implements OnInit {

  campaignForm=this.fb.group({
    name:['',Validators.required],
    purpose:['',Validators.required]
  })

  constructor(private fb: FormBuilder,private campaignService: CampaignService) { }

  ngOnInit(): void {
  }

  onSave(){
    const name=this.campaignForm.get('name')?.value;
    const purpose=this.campaignForm.get('purpose')?.value;
    const newCampaign:Campaign=new Campaign(name,purpose);
    this.campaignService.saveCampaign(newCampaign).subscribe();

  }

}
