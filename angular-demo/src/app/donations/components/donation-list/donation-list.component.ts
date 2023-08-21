import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  userId: number;

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
    this.activatedRoute.params.subscribe((params) => {
      this.userId = +params['id'];
    })
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

  private loadFilteredDonationsAndRefresh(){
    this.donationService.loadFilteredDonations().subscribe( () => {
      this.donationService.getDonations().subscribe(donations => {
        this.donationList = donations;
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
        this.loadDonationsAndRefresh();
      })
    })
  }

  approveDonation(donationToApprove: Donation) {
    this.activatedRoute.params.subscribe(() => {
      this.donationService.approveDonation(donationToApprove).subscribe( () => {},
        (error) =>
      {
        this.loadDonationsAndRefresh();
      })
    })
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

      if (this.approved) {
        queryParams['approved'] = this.approved;
      }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

      this.donationService.loadFilteredDonations().subscribe(() => {
        this.loadFilteredDonationsAndRefresh();
      });


  }

}
