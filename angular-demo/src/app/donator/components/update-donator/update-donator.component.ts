import { Component, OnInit } from '@angular/core';
import {User} from "../../../user/models/user";
import {Donator} from "../../models/donator";
import {DonatorService} from "../../services/donator.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-donator',
  templateUrl: './update-donator.component.html',
  styleUrls: ['./update-donator.component.css']
})
export class UpdateDonatorComponent implements OnInit {

  donator: Donator;
  id: number;
  update: string="update";

  constructor(private donatorService: DonatorService,
              private activatedRoute: ActivatedRoute) { }

  updateDonator(donator: Donator) {
    this.donatorService.updateDonator(donator).subscribe(
      response => window.alert(response)
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id=+params['id'];
      this.donatorService.findDonatorById(this.id).subscribe(donatorData =>{
        this.donator = donatorData;
      })
    })
  }

}
