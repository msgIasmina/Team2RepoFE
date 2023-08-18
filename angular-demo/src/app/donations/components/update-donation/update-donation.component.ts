import { Component, OnInit } from '@angular/core';
import {Donation} from "../../models/donation";

@Component({
  selector: 'app-update-donation',
  templateUrl: './update-donation.component.html',
  styleUrls: ['./update-donation.component.css']
})
export class UpdateDonationComponent implements OnInit {

  donation: Donation;
  id: number;
  update: string="update";
  constructor() { }

  ngOnInit(): void {
  }

}
