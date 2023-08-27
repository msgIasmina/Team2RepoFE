import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Donator } from '../../models/donator';
import { DonatorService } from '../../services/donator.service';
import { DonatorAction } from '../../models/DonatorAction';

@Component({
  selector: 'app-donator-details',
  templateUrl: './donator-details.component.html',
  styleUrls: ['./donator-details.component.css'],
})
export class DonatorDetailsComponent implements OnInit {
  @Input() donator: Donator;
  @Output() donatorAction = new EventEmitter<DonatorAction>();

  constructor() {}

  ngOnInit(): void {}

  onEditClicked(donator: Donator) {
    const action: DonatorAction = { donator, type: 'edit' };
    this.donatorAction.emit(action);
  }

  onDeleteClicked(donator: Donator) {
    const action: DonatorAction = { donator, type: 'delete' };
    this.donatorAction.emit(action);
  }
}

