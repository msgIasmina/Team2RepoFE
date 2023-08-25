import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from "../../services/user-service.service";
import {ActivatedRoute, Router} from '@angular/router';
import {UserAction} from "../../models/UserAction";
import {ToastrService} from "ngx-toastr";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList: User[];
  totalItems: number;

  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3, 5, 8]; // Options for page size

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userService.getSize().subscribe(
      totalItems => this.totalItems = totalItems
    )
    this.loadUsersAndRefresh();
  }

  handleUserAction(action: UserAction) {
    if (action.type === 'toggleActivation') {
      this.toggleActivation(action.user);
    } else if (action.type === 'edit') {
      this.editUser(action.user);
    } else if (action.type === 'manageRoles') {
      this.manageRoles(action.user);
    }
  }

  private loadUsersAndRefresh() {
    this.userService.loadUsers(this.currentPage, this.pageSize).subscribe(() => {
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
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasBenefPermission = permissions.includes('AUTHORITY_USER_MANAGEMENT');

    if(hasBenefPermission){
      this.router.navigate(
        ['/management/users/register/']
      );
    } else {
      this.toastr.error("It seems that you don't have the permissions for completing this action.")
    }
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsersAndRefresh();
  }

  private manageRoles(user: User) {
    
  }
}
