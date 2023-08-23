import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donation} from "../../models/donation";
import {UserAction} from "../../../user/models/UserAction";
import {DonationAction} from "../../models/DonationAction";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  @Input() donation: Donation;
  @Output() donationAction = new EventEmitter<DonationAction>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClicked(donation: Donation) {
    const action: DonationAction = { donation, type: 'edit'};
    this.donationAction.emit(action);
  }

  onDeleteClicked(donation: Donation){
    const action: DonationAction = { donation, type: 'delete'};
    this.donationAction.emit(action);
  }

  onApproveClicked(donation: Donation){
    const action: DonationAction = { donation, type: 'approve'};
    this.donationAction.emit(action);
  }

}
