import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donator} from "../../models/donator";
import {DonatorAction} from "../donator-list/donator-list.component";
import {DonatorService} from "../../services/donator.service";

@Component({
  selector: 'app-donator-details',
  templateUrl: './donator-details.component.html',
  styleUrls: ['./donator-details.component.css']
})
export class DonatorDetailsComponent implements OnInit {

  @Input() donator: Donator;
  @Output() donatorAction = new EventEmitter<DonatorAction>();
  constructor(private donatorService: DonatorService) { }

  ngOnInit(): void {
  }

  onEditClicked(donator: Donator) {
    const action: DonatorAction = { donator, type: 'edit' };
    this.donatorAction.emit(action);
  }

  onDeleteClicked(donator: Donator){
    const action: DonatorAction = { donator, type: 'delete' };
    this.donatorAction.emit(action);

    this.donatorService.deleteDonator(donator).subscribe();
  }

}
