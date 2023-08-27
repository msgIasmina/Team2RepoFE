import { Component, OnInit } from '@angular/core';
import { Donation } from '../../models/donation';
import { DonationService } from '../../services/donation.service';
import { Campaign } from '../../../campaigns/models/campaign';
import { Donator } from '../../../donator/models/donator';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css'],
})
export class AddDonationComponent implements OnInit {
  placeholder: Donation = new Donation(
    0,
    'currency',
    new Campaign('', ''),
    undefined,
    undefined,
    new Donator(),
  );
  register: string = 'register';

  constructor(private donationService: DonationService) {}

  ngOnInit(): void {}

  onSave(newDonation: Donation) {
    this.donationService.addDonation(newDonation).subscribe();
  }
}
