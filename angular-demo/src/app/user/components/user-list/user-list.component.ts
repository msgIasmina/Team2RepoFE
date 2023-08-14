import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from "../../services/user-service.service";
import { ActivatedRoute } from '@angular/router';

export interface UserAction {
  user: User;
  type: 'toggleActivation' | 'edit'; // Add more types if needed
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];
  page: number;
  size: number;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.page = +params['page'];
      this.size = +params['size'];

      this.loadUsersAndRefresh();
    });

  }

  handleUserAction(action: UserAction) {
    if (action.type === 'toggleActivation') {
      this.toggleActivation(action.user);
    } else if (action.type === 'edit') {
      this.editUser(action.user);
    }
  }

  private loadUsersAndRefresh() {
    this.userService.loadUsers(this.page, this.size).subscribe(() => {
      this.userService.getUsers().subscribe(users => {
        this.userList = users;
      });
    });
  }

  editUser(userToEdit: User) {
    this.activatedRoute.params.subscribe(() => {
      this.userService.updateUser(userToEdit).subscribe(() => {
        this.loadUsersAndRefresh();
      });
    });

  toggleActivation(userToToggle: User) {
    this.activatedRoute.params.subscribe(() => {
      this.userService.toggleActivation(userToToggle).subscribe(() => {
        this.loadUsersAndRefresh();
      });
    });
  }
}
