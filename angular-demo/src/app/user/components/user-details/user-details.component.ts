import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import {UserAction} from "../../models/UserAction";

@Component({
  selector: 'app-user',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() user: User;
  @Output() userAction = new EventEmitter<UserAction>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClicked(user: User) {
    const action: UserAction = { user, type: 'edit' };
    this.userAction.emit(action);
  }

  onToggleActivationClicked(user: User) {
    const action: UserAction = { user, type: 'toggleActivation' };
    this.userAction.emit(action);
  }
}
