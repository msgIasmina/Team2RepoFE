import { Component, OnInit } from '@angular/core';
import {Donator} from "../../models/donator";
import {DonatorService} from "../../services/donator.service";
import {ActivatedRoute} from "@angular/router";

export interface DonatorAction {
  donator: Donator;
  type: 'delete' | 'edit';
}

@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.css']
})
export class DonatorListComponent implements OnInit {

  donatorList: Donator[];
  page: number;
  size: number;
  constructor(private donatorService: DonatorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.page = +params['page'];
      this.size = +params['size'];

      this.loadDonatorsAndRefresh();
    });
  }

  // handleDonatorAction(action: DonatorAction) {
  //   if (action.type === 'edit') {
  //     this.editDonator(action.donator);
  //   }
  // }

  private loadDonatorsAndRefresh() {
    this.donatorService.loadDonators(this.page, this.size).subscribe(() => {
      this.donatorService.getDonators().subscribe(donators => {
        this.donatorList = donators;
      });
    });
  }

  // editDonator(donatorToEdit: Donator) {
  //   this.activatedRoute.params.subscribe(() => {
  //     this.donatorService.updateDonator(donatorToEdit).subscribe(() => {
  //       this.loadDonatorsAndRefresh();
  //     });
  //   });
  // }
}
