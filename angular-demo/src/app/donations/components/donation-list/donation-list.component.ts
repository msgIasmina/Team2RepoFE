import {Component, Input, OnInit} from '@angular/core';
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
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ngxCsv} from "ngx-csv";

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {
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

  donationForm: FormGroup = this.fb.group({
    minAmount: [''],
    maxAmount: [''],
    Amount: [''],
    currency: [''],
    searchTerm: [''],
    campaignId: [''],
    createdByUserId: [''],
    createDateStart: [''],
    createDateEnd: [''],
    approved: [''],
    approvedDateStart: [''],
    approvedDateEnd: ['']
  })

  constructor(private donationService: DonationService,
              private userService: UserService,
              private campaignService: CampaignService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private toastr: ToastrService,
              private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.filterParams['offset'] = 0;
    this.filterParams['pageSize'] = 5;

    this.loadDonationsAndRefresh();

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

  private loadDonationsAndRefresh() {
    this.donationService.loadDonations(this.filterParams).subscribe(() => {
      this.donationService.getDonationFilterPair().subscribe(donationFilterPair => {
        this.donationList = donationFilterPair.donations;
        this.totalItems = donationFilterPair.totalItems;
      });
    })
  }

  handleDonationAction(action: DonationAction) {
    if (action.type === 'edit') {
      this.editDonation(action.donation);
    } else if (action.type === 'delete') {
      this.deleteDonation(action.donation);
    } else if (action.type === 'approve') {
      this.approveDonation(action.donation);
    }
  }

  deleteDonation(donationToDelete: Donation) {
    this.activatedRoute.params.subscribe(() => {
      this.donationService.deleteDonation(donationToDelete).subscribe(() => {
        },
        (error) => {
          this.loadDonationsAndRefresh();
        })
    })
  }

  approveDonation(donationToApprove: Donation) {
    this.activatedRoute.params.subscribe(() => {
      this.donationService.approveDonation(donationToApprove).subscribe(() => {
        },
        (error) => {
          this.loadDonationsAndRefresh();
        })
    })
  }

  editDonation(donationToEdit: Donation) {
    this.router.navigate(["management/donations/edit/" + donationToEdit.id])
  }

  applyFilters() {
    this.clearFilterParams();

    if (this.donationForm.get('minAmount') !== null) {
      this.filterParams['minAmount'] = this.donationForm.get('minAmount')?.value;
    }

    if (this.donationForm.get('maxAmount') !== null) {
      this.filterParams['maxAmount'] = this.donationForm.get('maxAmount')?.value;
    }

    if (this.donationForm.get("Amount") !== null) {
      this.filterParams['Amount'] = this.donationForm.get("Amount")?.value;
    }

    if (this.donationForm.get('currency')) {
      this.filterParams['currency'] = this.donationForm.get('currency')?.value;
    }

    if (this.donationForm.get("campaignId")) {
      this.filterParams['campaignId'] = this.donationForm.get('campaignId')?.value;
    }

    if (this.donationForm.get('searchTerm') !== null) {
      this.filterParams['searchTerm'] = this.donationForm.get('searchTerm')?.value;
    }

    if (this.donationForm.get('createdByUserId')) {
      this.filterParams['createdByUserId'] = this.donationForm.get('createdByUserId')?.value;
    }

    if (this.donationForm.get('createDateStart')) {
      this.filterParams['createDateStart'] = this.donationForm.get('createDateStart')?.value;
    }

    if (this.donationForm.get('createDateEnd')) {
      this.filterParams['createDateEnd'] = this.donationForm.get('createDateEnd')?.value;
    }

    if (this.donationForm.get('approved')) {
      this.filterParams['approved'] = this.donationForm.get('approved')?.value;
    }

    if (this.donationForm.get('approvedDateStart')) {
      this.filterParams['approvedDateStart'] = this.donationForm.get('approvedDateStart')?.value;
    }

    if (this.donationForm.get('approvedDateEnd')) {
      this.filterParams['approvedDateEnd'] = this.donationForm.get('approvedDateEnd')?.value;
    }

    this.loadDonationsAndRefresh();
  }

  clearFilterParams() {
    for (const prop in this.filterParams) {
      if (prop !== 'pageSize') {
        delete this.filterParams[prop];
      }
    }
    this.filterParams['offset'] = 0;

  }

  clearAllFilterParamsAndRefresh() {
    this.donationForm.reset();
  }

  pageChanged(event: PageEvent): void {
    this.filterParams['offset'] = event.pageIndex;
    this.filterParams['pageSize'] = event.pageSize;
    this.loadDonationsAndRefresh();
  }

  updateCreateDateEndMin() {
    this.minCreateDateEnd = this.createDateStart;
  }

  updateApprovedDateEndMin() {
    this.minApprovedDateEnd = this.approvedDateStart;
  }

  toggleDropdown(): void {
    const dropdownContent = document.querySelector(".dropdown-content");

    if (dropdownContent instanceof HTMLElement) {
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    }
  }

  onAddDonationClicked() {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasBenefPermission = permissions.includes('AUTHORITY_DONATION_MANAGEMENT');

    if (hasBenefPermission) {
      this.router.navigate(
        ['/management/donators/register/']
      );
    } else {
      this.toastr.error("It seems that you don't have the permissions for completing this action.")
    }
    downloadCsvFile()
    {
      console.log("Hello")
      let exportData: Donation[];
      delete this.filterParams['offset']
      this.donationService.loadDonations(this.filterParams).subscribe(() => {
        this.donationService.getDonationFilterPair().subscribe(donationFilterPair => {
          exportData = donationFilterPair.donations;
          const selectedFields = [];
          for (const donation of exportData) {
            selectedFields.push({
              Amount: donation.amount,
              Currency: donation.currency,
              Campaign: donation.campaign?.name,
              Creator: `${donation.createdBy?.firstName} ${donation.createdBy?.lastName}`,
              'Creation Date': donation.createDate,
              Benefactor: donation.benefactor ? `${donation.benefactor.firstName} ${donation.benefactor.lastName}` : 'Unknown',
              Approved: donation.approved ? 'Yes' : 'No',
              'Approved By': donation.approvedBy ? `${donation.approvedBy?.firstName} ${donation.approvedBy?.lastName}` : '',
              'Approval Date': donation.approvedDate ? donation.approvedDate : '',
              Notes: donation.notes ? donation.notes : ''
            });
          }

          var options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Report data',
            useBom: true,
            noDownload: false,
            headers: ['Amount, Currency, Campaign, Creator, Creation Date, Benefactor, Approved, Approved By, Approval Date, Notes']
          };

          new ngxCsv(selectedFields, "filteredDonations", options);
        });
      })
    }
  }
}



