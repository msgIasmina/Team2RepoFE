import {Component, Input, OnInit} from '@angular/core';
import {Donation} from "../../models/donation";

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent implements OnInit {

  constructor() { }


  donationList: Donation[] = [
  ];

  ngOnInit(): void {
  }

}
