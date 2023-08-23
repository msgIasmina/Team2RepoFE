import { Component, OnInit } from '@angular/core';
import {Donator} from "../../models/donator";
import {DonatorService} from "../../services/donator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DonatorAction} from "../../models/DonatorAction";
import {User} from "../../../user/models/User";

@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.css']
})
export class DonatorListComponent implements OnInit {

  donatorList: Donator[];
  page: number;
  size: number;
  constructor(private donatorService: DonatorService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.page = +params['page'];
      this.size = +params['size'];
      this.loadDonatorsAndRefresh();
    });
  }

  handleDonatorAction(action: DonatorAction) {
    if (action.type === 'delete') {
      this.deleteDonator(action.donator);
    }
    else if(action.type === "edit"){
      this.editDonator(action.donator);
    }
  }

  private loadDonatorsAndRefresh() {
    this.donatorService.loadDonators(this.page, this.size).subscribe(() => {
      this.donatorService.getDonators().subscribe(donators => {
        this.donatorList = donators;
      });
    });
  }

  editDonator(donatorToEdit: Donator) {
    this.router.navigate(
      ['/management/donators/update/'+donatorToEdit.id]
    );
  }

  private deleteDonator(donatorToDelete: Donator) {
    this.activatedRoute.params.subscribe(() => {
      this.donatorService.deleteDonator(donatorToDelete).subscribe(() => {
        },
        error => {
          this.loadDonatorsAndRefresh() // Refresh the list after deletion
        })
    })
    }

  onAddDonatorClicked(){
    this.router.navigate(
      ['/management/donators/register/']
    );
  }
}
