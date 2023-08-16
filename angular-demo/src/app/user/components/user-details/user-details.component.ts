import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service.service';
import { UserAction } from '../user-list/user-list.component';

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
