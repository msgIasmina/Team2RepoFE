import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from "../../services/user-service.service";
import {ActivatedRoute, Router} from '@angular/router';
import {UserAction} from "../../models/UserAction";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];
  page: number;
  size: number;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router:Router) {
  }

  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe((params) => {
  //     this.page = +params['page'];
  //     this.size = +params['size'];
  //     this.loadUsersAndRefresh();
  //   });
  // }
  ngOnInit(): void {
    const navigationState = this.router.getCurrentNavigation()?.extras.state;

    if (navigationState) {
      this.page = navigationState['page'];
      this.size = navigationState['size'];
    } else {
      this.page = 0;
      this.size = 7;
    }
      this.loadUsersAndRefresh();
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
    this.router.navigate(
      ['/management/users/update/'+userToEdit.id]
    );
  }

    toggleActivation(userToToggle: User) {
      this.activatedRoute.params.subscribe(() => {
        this.userService.toggleActivation(userToToggle).subscribe(() => {
          this.loadUsersAndRefresh();
        });
      });
    }

  onAddUserClicked(){
    this.router.navigate(
      ["management/users/register"]
    );
  }
}
