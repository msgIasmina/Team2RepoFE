import { Component, OnInit } from '@angular/core';
import {DonatorService} from "../../services/donator.service";
import {Donator} from "../../models/donator";


@Component({
  selector: 'app-donator-register',
  templateUrl: './donator-register.component.html',
  styleUrls: ['./donator-register.component.css']
})
export class DonatorRegisterComponent {
  placeholder:Donator= new Donator("firstName","additionalName","lastName","maidenName")
  registerdonator:string="registerdonator"
  onSave(newDonator:Donator) {
    this.donatorService.saveDonator(newDonator).subscribe();
  }

  constructor(private donatorService: DonatorService) {}
}
