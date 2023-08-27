import { Component, OnInit } from '@angular/core';
import {User} from "../../../user/models/user";
import {Donator} from "../../models/donator";
import {DonatorService} from "../../services/donator.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  updateDonator(donator: Donator) {
    this.donatorService.updateDonator(donator).subscribe(
      response => this.toastr.info(response)
    )
    this.toastr.success("Donator edited successfully")
    window.location.href = '/management/donators/list';
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
