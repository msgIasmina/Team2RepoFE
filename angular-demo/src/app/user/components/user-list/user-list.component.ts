import { Component, OnInit } from '@angular/core';
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
  pageSizeOptions: number[] = [3, 5, 6]; // Options for page size

  params: any = {};

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router:Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.params['offset'] = 0;
    this.params['pageSize'] = 5;

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
    this.userService.loadUsers(this.currentPage, this.pageSize).subscribe(() => {
      this.userService.getUsers().subscribe(userPair => {
        this.userList = userPair.users;
        this.totalItems = userPair.totalItems;
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
    this.params['offset'] = event.pageIndex;
    this.params['pageSize'] = event.pageSize;
    this.loadUsersAndRefresh();
  }
}
