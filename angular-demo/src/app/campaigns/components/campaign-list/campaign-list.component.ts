import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaignList:Campaign[];

  constructor(private campaignService:CampaignService,private router:Router) { }

  ngOnInit(): void {
    this.loadCampaignsAndRefresh();
  }

  private loadCampaignsAndRefresh(){
    this.campaignService.loadCampaigns().subscribe(()=>{
      this.campaignService.getCampaigns().subscribe(campaigns=>{
        this.campaignList=campaigns;
      })
    })
  }

}
