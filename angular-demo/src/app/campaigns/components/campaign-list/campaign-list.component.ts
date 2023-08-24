import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {CampaignAction} from "../../../user/models/CampaignAction";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {

  campaignList: Campaign[];
  totalItems: number;

  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3, 5, 6]; // Options for page size

  nameTerm: string;
  purposeTerm: string;

  params: any = {};

  constructor(private campaignService:CampaignService,private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.params['offset'] = 0;
    this.params['pageSize'] = 5;
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
    this.campaignService.loadCampaigns(this.params).subscribe(()=>{
      this.campaignService.getCampaignFilterPair().subscribe(campaignFilterPair=>{
        this.campaignList = campaignFilterPair.campaigns;
        this.totalItems = campaignFilterPair.totalItems;
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
            this.campaignList = campaigns
          }
        )
      }
    );
  }

  onAddCampaignClicked(){
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasCampPermission = permissions.includes('AUTHORITY_CAMP_MANAGEMENT');

    if(hasCampPermission){
      this.router.navigate(
        ['/management/campaigns/add/']
      );
    } else {
      this.toastr.error("It seems that you don't have the permissions for completing this action.")
    }
  }

  applyFilters(){
    this.clearFilterParams();

    if (this.nameTerm != null){
      this.params['nameTerm'] = this.nameTerm;
    }

    if (this.purposeTerm != null){
      this.params['purposeTerm'] = this.purposeTerm;
    }

    this.loadCampaignsAndRefresh();
  }

  clearFilterParams(){
    for (const prop in this.params) {
      if (prop !== 'pageSize') {
        delete this.params[prop];
      }
    }
    this.params['offset'] = 0;
  }

}
