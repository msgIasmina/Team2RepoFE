import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {CampaignAction} from "../../../user/models/CampaignAction";

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

  handleCampaignAction(action:CampaignAction){
    if(action.type==='edit'){
      this.editCampaign(action.campaign);
    }else if(action.type==='delete'){
      this.deleteCampaign(action.campaign);
    }
  }

  loadCampaignsAndRefresh(){
    this.campaignService.loadCampaigns().subscribe(()=>{
      this.campaignService.getCampaigns().subscribe(campaigns=>{
        this.campaignList=campaigns;
      })
    })
  }

  editCampaign(campaignToEdit:Campaign){
    this.router.navigate(["/management/campaigns/edit/"+campaignToEdit.id]);
  }

  deleteCampaign(campaignToDelete:Campaign){
    this.campaignService.deleteCampaignById(campaignToDelete.id).subscribe(()=>{
    },
      error => {
        this.campaignService.loadCampaigns().subscribe(
          campaigns => {
            console.log(campaigns)
            this.campaignList = campaigns
          }
        )
      }
    );
  }

}
