import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignService} from "../../services/campaign.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {

  campaign:Campaign;
  id:number;
  update:string="update"

  constructor(private activatedRoute: ActivatedRoute,private campaignService:CampaignService) { }

  editCampaign(campaign:Campaign){
    this.campaignService.editCampaign(campaign).subscribe(
      response=>window.alert(response)
    );
    window.alert("Successfully Campaign Edited!");
    window.location.href = '/management/campaigns/listing';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.id= +params['id'];
      this.campaignService.findCampaignById(this.id).subscribe(
        placeholder=>{
          this.campaign=placeholder
        })
    })
  }

}
