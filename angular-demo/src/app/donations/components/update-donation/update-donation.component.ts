import {Component, OnInit} from '@angular/core';
import {Donation} from "../../models/donation";
import {DonationService} from "../../services/donation.service";
import {ActivatedRoute} from "@angular/router";
import {Donator} from "../../../donator/models/donator";

@Component({
  selector: 'app-update-donation',
  templateUrl: './update-donation.component.html',
  styleUrls: ['./update-donation.component.css']
})
export class UpdateDonationComponent implements OnInit {

  donation: Donation;
  id: number;
  update: string = "update";

  constructor(private donationService: DonationService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.donationService.findDonationById(this.id).subscribe(donationData => {
        this.donation = donationData;
      })
    });
  }


  onEdit(donation: Donation) {
    this.donationService.updateDonation(donation).subscribe();
  }
}
