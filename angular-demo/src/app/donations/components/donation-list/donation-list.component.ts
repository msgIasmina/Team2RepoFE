import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {Donation} from "../../models/donation";
import {User}  from "../../../user/models/User"
import {ActivatedRoute, Router} from "@angular/router";
import {Campaign} from "../../../campaigns/models/campaign";
import {DonationService} from "../../services/donation.service";
import {DonationAction} from "../../models/doation-action";



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

  currencyOptions: string[];
  currency: string;

  campaignOptions: Campaign[] = [];
  campaignId: number;

  searchTerm: string;

  userOptions: User[] = [];
  createdByUserId: number;

  createDate: Date;

  approved: boolean;

  constructor(//private donationService: DonationService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private donationService:DonationService) { }

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

    this.donationService.getCurrencies().subscribe(currencies => {
      this.currencyOptions = currencies;
    });

    this.donationService.getCampaigns().subscribe(campaigns => {
      this.campaignOptions = campaigns;
      });

    this.donationService.getUsers().subscribe(users => {
      this.userOptions = users;
      console.log(users[0].id);
    })
  }

  private loadDonationsAndRefresh(){
    /*this.donationService.loadDonations(this.page, this.size).subscribe( () => {
      this.donationService.getDonations().subscribe(donations => {
        this.donationList = donations;
      });
  })*/
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

      if (this.campaignOptions) {
        queryParams['campaignId'] = this.campaignId;
      }

      if (this.searchTerm != null) {
        queryParams['searchTerm'] = this.searchTerm;
      }

      if (this.userOptions) {
        queryParams['createdById'] = this.createdByUserId;
      }

      if (this.createDate) {
        queryParams['createDate'] = this.createDate;
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
