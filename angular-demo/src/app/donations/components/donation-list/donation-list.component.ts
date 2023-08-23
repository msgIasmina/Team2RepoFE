import {Component, OnInit} from '@angular/core';
import {Donation} from "../../models/donation";
/*import {DonationService} from "../../services/donation.service";*/
import {ActivatedRoute, Router} from "@angular/router";
import {Campaign} from "../../../campaigns/models/campaign";
import {CampaignService} from "../../../campaigns/services/campaign.service";
import {UserService} from "../../../user/services/user-service.service";
import {PageEvent} from "@angular/material/paginator";
import {DonationService} from "../../services/donation.service";
import {DonationAction} from "../../models/DonationAction";
import {User} from "../../../user/models/user";

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
  // userId: number;

  donationList: Donation[];

  totalItems: number;
  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3, 5, 6]; // Options for page size

  minAmount: number;
  maxAmount: number;

  value: number;

  currencyOptions: string[];
  currency: string;

  campaignOptions: Campaign[] = [];
  campaignId: number;

  searchTerm: string;

  userOptions: User[] = [];
  createdByUserId: number;

  createDateStart: Date;
  createDateEnd: Date;
  minCreateDateEnd: Date;

  approved: boolean;

  approvedDateStart: Date;
  approvedDateEnd: Date;
  minApprovedDateEnd: Date;

  filterParams: any = {};

  constructor(private donationService: DonationService,
              private userService: UserService,
              private campaignService: CampaignService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.donationService.getSize().subscribe(size => {
    //   this.totalItems = size;
    // });


    this.filterParams['offset'] = 0;
    this.filterParams['pageSize'] = 5;

    this.loadDonationsAndRefresh(this.filterParams);

    this.donationService.getCurrencies().subscribe(currencies => {
      this.currencyOptions = currencies;
    });

    this.donationService.getCampaigns().subscribe(campaigns => {
      this.campaignOptions = campaigns;
      });

    this.donationService.getUsers().subscribe(users => {
      this.userOptions = users;
    })
  }

  private loadDonationsAndRefresh(filterParams: any){
    this.donationService.loadDonations(filterParams).subscribe( () => {
      this.donationService.getDonationFilterPair().subscribe(donationFilterPair => {
        this.donationList = donationFilterPair.donations;
        this.totalItems = donationFilterPair.totalItems;
      });
    })
  }

  handleDonationAction(action: DonationAction) {
    if (action.type === 'edit') {
      //this.toggleActivation(action.user);
    } else if (action.type === 'delete'){
      this.deleteDonation(action.donation);
    } else if (action.type === 'approve'){
      this.approveDonation(action.donation);
    }
  }

  deleteDonation(donationToDelete: Donation) {
    this.activatedRoute.params.subscribe(() => {
      this.donationService.deleteDonation(donationToDelete).subscribe( () => {},
        (error) => {
        this.loadDonationsAndRefresh(this.filterParams);
      })
    })
  }

  approveDonation(donationToApprove: Donation) {
    this.activatedRoute.params.subscribe(() => {
      this.donationService.approveDonation(donationToApprove).subscribe( () => {},
        (error) =>
      {
        this.loadDonationsAndRefresh(this.filterParams);
      })
    })
  }

  applyFilters(){
    this.clearFilterParams();

      if (this.minAmount !== null) {
        this.filterParams['minAmount'] = this.minAmount;
      }

      if (this.maxAmount !== null) {
        this.filterParams['maxAmount'] = this.maxAmount;
      }

      if  (this.value !== null) {
        this.filterParams['value'] = this.value;
      }

      if (this.currency) {
        this.filterParams['currency'] = this.currency;
      }

      if (this.campaignOptions) {
        this.filterParams['campaignId'] = this.campaignId;
      }

      if (this.searchTerm != null) {
        this.filterParams['searchTerm'] = this.searchTerm;
      }

      if (this.userOptions) {
        this.filterParams['createdById'] = this.createdByUserId;
      }

      if (this.createDateStart) {
        this.filterParams['createDateStart'] = this.createDateStart;
      }

      if (this.createDateEnd){
        this.filterParams['createDateEnd'] = this.createDateEnd;
      }

      if (this.approved) {
        this.filterParams['approved'] = this.approved;
      }

      if (this.approvedDateStart) {
        this.filterParams['approvedDateStart'] = this.approvedDateStart;
      }

      if (this.approvedDateStart) {
        this.filterParams['approvedDateEnd'] = this.approvedDateEnd;
      }

    this.loadDonationsAndRefresh(this.filterParams);
  }

  clearFilterParams(){
    for (const prop in this.filterParams) {
      if (prop !== 'pageSize') {
        delete this.filterParams[prop];
      }
    }
    this.filterParams['offset'] = 0;

  }

  clearAllFilterParamsAndRefresh() {
    this.router.navigate(
      ['/management/donations/list']
    );
  }

  pageChanged(event: PageEvent): void {
    this.filterParams['offset'] = event.pageIndex;
    this.filterParams['pageSize'] = event.pageSize;
    this.loadDonationsAndRefresh(this.filterParams);
  }

  updateCreateDateEndMin() {
    this.minCreateDateEnd = this.createDateStart;
  }

  updateApprovedDateEndMin() {
    this.minApprovedDateEnd = this.approvedDateStart;
  }
}
