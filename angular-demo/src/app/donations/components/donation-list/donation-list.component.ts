import {Component, Input, OnInit} from '@angular/core';
import {Donation} from "../../models/donation";
import {User} from "../../../user/models/user";
import {DonationService} from "../../services/donation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAction} from "../../../user/models/UserAction";
import {DonationAction} from "../../models/DonationAction";
import {Campaign} from "../../../campaigns/models/campaign";
import {CampaignService} from "../../../campaigns/services/campaign.service";
import {UserService} from "../../../user/services/user-service.service";

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
  donationList: Donation[];
  page: number;
  size: number;

  minAmount: number;
  maxAmount: number;

  value: number;

  currencyOptions: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'RON', 'CHF', 'SEK', 'NOK', 'DKK', 'CZK', 'PLN', 'HUF'];
  currency: string;

  campaignOptions: Campaign[] = [];
  campaign: Campaign;

  userOptions: User[] = [];
  createdBy: User;

  createDate: Date;

  searchTerm: string;
  approved: boolean;

  constructor(private donationService: DonationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private campaignService: CampaignService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.page = +queryParams['offset'];
      this.size = +queryParams['pageSize'];
      this.loadDonationsAndRefresh();
      }
    )
  }

  private loadDonationsAndRefresh(){
    this.donationService.loadDonations(this.page, this.size).subscribe( () => {
      this.donationService.getDonations().subscribe(donations => {
        this.donationList = donations;
      });
  })
  }

  handleDonationAction(action: DonationAction) {
    if (action.type === 'edit') {
      //this.toggleActivation(action.user);
    }
  }

  applyFilters(){
      const queryParams: any = {};

      if (this.minAmount !== null) {
        queryParams['minAmount'] = this.minAmount;
      }

      if (this.maxAmount !== null) {
        queryParams['maxAmount'] = this.maxAmount;
      }

      if  (this.value !== null) {
        queryParams['value'] = this.value;
      }

      if (this.currency) {
        queryParams['currency'] = this.currency;
      }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
  }

}
