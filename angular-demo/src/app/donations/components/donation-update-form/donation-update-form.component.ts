import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donation} from "../../models/donation";
import {FormBuilder, Validators} from "@angular/forms";
import {DonatorService} from "../../../donator/services/donator.service";
import {DonationService} from "../../services/donation.service";
import {CampaignService} from "../../../campaigns/services/campaign.service";
import {ActivatedRoute} from "@angular/router";
import {Donator} from "../../../donator/models/donator";
import {Campaign} from "../../../campaigns/models/campaign";

@Component({
  selector: 'app-donation-update-form',
  templateUrl: './donation-update-form.component.html',
  styleUrls: ['./donation-update-form.component.css']
})
export class DonationUpdateFormComponent implements OnInit {

  ngOnInit(): void {
    this.donationService.getCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
    console.log(this.currencies)

    this.donatorService.loadDonators2().subscribe(() => {
        this.donatorService.getDonators().subscribe(donators => {
          this.donators = donators;
        });
        console.log(this.donators)
      },
      (error) => {
        console.log(error.message)
      });


    this.campaignService.loadCampaigns().subscribe(() => {
        this.campaignService.getCampaigns().subscribe(campaigns => {
          this.campaigns = campaigns;
        });
        console.log(this.campaigns)
      },
      (error) => {
        console.log(error.message)
      });

    console.log(this.campaigns)
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    })

    this.updateDonationForm.setValue({
          amount: this.donation.amount,
          currency: this.donation.currency,
          campaignID: this.donation.campaign?.id,
          benefactorID: this.donation.benefactor?.id,
          notes: this.donation.notes})
    console.log(this.updateDonationForm)

  }
  id: number;


  @Output()
  submitEvent: EventEmitter<Donation> = new EventEmitter<Donation>();
  @Input()
  donation: Donation;
  @Input()
  functionality: string
  submitted = false;

  updateDonationForm = this.fb.group({
    amount: ['', Validators.required],
    currency: ['', Validators.required],
    campaignID: ['', Validators.required],
    benefactorID: ['', Validators.required],
    notes: ['']
  })
  donators: Donator[];
  campaigns: Campaign[];
  amount: string = 'amount';
  currency: string = 'currency';
  notes: string = 'notes';
  currencies: string[]=[];


  showAmountError(): boolean {
    const amountControl = this.updateDonationForm.get('amount');
    let isRegistration: boolean = this.functionality === "register";
    return this.submitted && amountControl?.hasError('required') && isRegistration || false;
  }

  showCurrencyError(): boolean {
    const currencyControl = this.updateDonationForm.get('currency');
    let isRegistration: boolean = this.functionality === "register";
    return this.submitted && currencyControl?.hasError('required') && isRegistration || false;
  }

  onEdit() {
    this.submitted = true;
    const amount = this.updateDonationForm.get('amount')?.value;
    const currency = this.updateDonationForm.get('currency')?.value;
    const campaign = {id:this.updateDonationForm.get('campaignID')?.value};
    const benefactor = {id:this.updateDonationForm.get('benefactorID')?.value};
    const notes = this.updateDonationForm.get('notes')?.value;

    let newDonation: Donation = {
      amount,
      currency,
      campaign,
      benefactor,
      notes,
    };
      newDonation.id = this.donation.id;
    if (this.updateDonationForm.valid) {
      this.submitEvent.emit(newDonation)
    }
    console.log(newDonation)
  }

  constructor(private fb: FormBuilder,
              private donatorService: DonatorService,
              private donationService: DonationService,
              private campaignService: CampaignService,
              private activatedRoute: ActivatedRoute) {
  }



  showCampaignError(): boolean {
    return this.submitted && this.updateDonationForm.get('campaignID')?.value == null;
  }

  showBenefactorError(): boolean {
    return this.submitted && this.updateDonationForm.get('benefactorID')?.value == null;
  }
}
