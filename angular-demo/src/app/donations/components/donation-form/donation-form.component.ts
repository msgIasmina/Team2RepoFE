import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donation} from "../../models/donation";
import {FormBuilder, Validators} from "@angular/forms";
import {Donator} from "../../../donator/models/donator";
import {DonatorService} from "../../../donator/services/donator.service";
import {DonationService} from "../../services/donation.service";
import {Campaign} from "../../../campaigns/models/campaign";
import {CampaignService} from "../../../campaigns/services/campaign.service";
import {ActivatedRoute} from "@angular/router";
import {currencies} from "../../models/Currencies";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {
  ngOnInit(): void {

    this.donatorService.loadDonators2().subscribe(() => {
        this.donatorService.getDonators().subscribe(donators => {
          this.donators = donators;
        });
      },
      (error) => {
        this.toastr.error(error.message)
      });

    this.campaignService.loadCampaigns({}).subscribe(() => {
        this.campaignService.getCampaignFilterPair().subscribe(campaignFilterPair => {
          this.campaigns = campaignFilterPair.campaigns;
        });
      },
      (error) => {
      this.toastr.error(error.message)
      });

    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    })

    // if (this.functionality === "update") {
    //   console.log(this.donation)
    //
    //   this.donationForm.setValue({
    //     amount: this.donation.amount,
    //     currency: this.donation.currency,
    //     campaign: this.donation.campaign,
    //     benefactor: this.donation.benefactor,
    //     notes: this.donation.notes,
    //   })
    // }
  }
  id: number;


  @Output()
  submitEvent: EventEmitter<Donation> = new EventEmitter<Donation>();
  @Input()
  donation: Donation;
  @Input()
  functionality: string
  submitted = false;

  donationForm = this.fb.group({
    amount: ['', Validators.required],
    currency: ['', Validators.required],
    campaign: ['', Validators.required],
    benefactor: ['', Validators.required],
    notes: ['']
  })
  donators: Donator[];
  campaigns: Campaign[];
  amount: string = 'amount';
  currency: string = 'currency';
  notes: string = 'notes';
  currencies: string[]=currencies;



  showAmountError(): boolean {
    const amountControl = this.donationForm.get('amount');
    let isRegistration: boolean = this.functionality === "register";
    return this.submitted && amountControl?.hasError('required') && isRegistration || false;
  }

  showCurrencyError(): boolean {
    const currencyControl = this.donationForm.get('currency');
    let isRegistration: boolean = this.functionality === "register";
    return this.submitted && currencyControl?.hasError('required') && isRegistration || false;
  }

  onSave() {
    this.submitted = true;
    const amount = this.donationForm.get('amount')?.value;
    const currency = this.donationForm.get('currency')?.value;
    const campaign = this.donationForm.get('campaign')?.value;
    const benefactor = this.donationForm.get('benefactor')?.value;
    const notes = this.donationForm.get('notes')?.value;

    let newDonation: Donation = {
      amount,
      currency,
      campaign,
      benefactor,
      notes,
    };
    if (this.functionality === "update") {
      newDonation.id = this.donation.id;
    }
    if (this.donationForm.valid) {
      this.submitEvent.emit(newDonation)
      // if (this.functionality === "register") {
      //   //this.donationForm.reset();
      // }
    }
  }

  constructor(private fb: FormBuilder,
              private donatorService: DonatorService,
              private donationService: DonationService,
              private campaignService: CampaignService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
  }



  showCampaignError(): boolean {
    return this.submitted && this.donationForm.get('campaign')?.value == null;
  }

  showBenefactorError(): boolean {
    return this.submitted && this.donationForm.get('benefactor')?.value == null;
  }
}
