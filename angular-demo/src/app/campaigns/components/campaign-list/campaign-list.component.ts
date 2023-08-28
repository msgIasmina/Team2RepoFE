import { Component, OnInit } from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CampaignAction} from "../../models/CampaignAction";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {saveAs} from "file-saver";

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

  campaignForm: FormGroup = this.fb.group({
    nameTerm: [''],
    purposeTerm: [''],
  });

  constructor(
    private campaignService: CampaignService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.params['offset'] = 0;
    this.params['pageSize'] = 5;
    this.loadCampaignsAndRefresh();
  }

  handleCampaignAction(action: CampaignAction) {
    if (action.type === 'edit') {
      this.editCampaign(action.campaign);
    } else if (action.type === 'delete') {
      this.deleteCampaign(action.campaign);
    }
  }

  loadCampaignsAndRefresh() {
    this.campaignService.loadCampaigns(this.params).subscribe(() => {
      this.campaignService
        .getCampaignFilterPair()
        .subscribe((campaignFilterPair) => {
          this.campaignList = campaignFilterPair.campaigns;
          this.totalItems = campaignFilterPair.totalItems;
        });
    });
  }

  editCampaign(campaignToEdit: Campaign) {
    this.router.navigate(['/management/campaigns/edit/' + campaignToEdit.id]);
  }

  deleteCampaign(campaignToDelete: Campaign) {
    this.campaignService.deleteCampaignById(campaignToDelete.id).subscribe(
      (response) => {
        this.toastr.success(response.text),
          this.campaignService
            .loadCampaigns(this.params)
            .subscribe((campaignFilterPair) => {
              this.campaignList = campaignFilterPair.campaigns;
              this.totalItems = campaignFilterPair.totalItems;
            });
      },
      (error) => {
        this.toastr.error(error.error);
      },
    );
  }

  onAddCampaignClicked() {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasCampPermission = permissions.includes('AUTHORITY_CAMP_MANAGEMENT');

    if (hasCampPermission) {
      this.router.navigate(['/management/campaigns/add/']);
    } else {
      this.toastr.error(
        "It seems that you don't have the permissions for completing this action.",
      );
    }
  }

  applyFilters() {
    this.clearFilterParams();

    if (this.campaignForm.get('nameTerm') != null) {
      this.params['nameTerm'] = this.campaignForm.get('nameTerm')?.value;
    }

    if (this.campaignForm.get('purposeTerm') != null) {
      this.params['purposeTerm'] = this.campaignForm.get('purposeTerm')?.value;
    }

    this.loadCampaignsAndRefresh();
  }

  clearFilterParams() {
    for (const prop in this.params) {
      if (prop !== 'pageSize') {
        delete this.params[prop];
      }
    }
    this.params['offset'] = 0;
  }

  clearAllFilterParamsAndRefresh() {
    this.campaignForm.reset();
  }

  pageChanged(event: PageEvent): void {
    this.params['offset'] = event.pageIndex;
    this.params['pageSize'] = event.pageSize;
    this.loadCampaignsAndRefresh();
  }

  toggleDropdown(): void {
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownContent instanceof HTMLElement) {
      dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block';
    }
  }

  downloadFile() {
    this.campaignService.downloadCsvFile(this.params).subscribe(
      (response: Blob) => {
        const file = new Blob([response], { type: 'text/csv' });
        saveAs(file, 'Campaigns.csv');
      },
      (error) => {
        this.toastr.error(error.message, 'Error downloading CSV file');
      },
    );
  }

}
