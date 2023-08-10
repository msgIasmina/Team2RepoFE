import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from "../../services/user-service.service";
import { switchMap, tap } from "rxjs";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const page = params['page'];
      const size = params['size'];

      this.userService.loadUsers(page, size).subscribe();
      this.userService.getUsers().subscribe((users) => this.userList = users);
    });

  }

  editUser(userToEdit: User) {
    //userToEdit.username = 'admin';
    this.activatedRoute.params.subscribe((params) => {
      const page = params['page'];
      const size = params['size'];

      this.userService.updateUser(userToEdit).subscribe(() => this.userService.loadUsers(page, size));
    });

  }
}