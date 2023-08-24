import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user-service.service";
import {RoleService} from "../../services/role.service";
import {Role} from "../../models/role";
import {SelectedRolesService} from "../../services/selected-roles.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User;
  id: number;
  update: string = "update";
  selectedRoles: Role[] = [];
  roleList:Role[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private selectedRolesService: SelectedRolesService,
              private roleService: RoleService
  ) {}

  updateUser(user: User) {
    this.userService.updateUser(user).subscribe(
      response => window.alert(response)
    )
    window.alert("Successfully User Edited!");
    window.location.href = '/management/users/list';
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.userService.findUserById(this.id).subscribe(userData => {
        this.user = userData;

        if (this.user.rolesIDs) {
          this.roleService.getRoles().subscribe(roles => {
            this.selectedRoles = roles.filter(role =>
              this.user.rolesIDs?.includes(role.id)
            );
          });
        }
      });
    });
    this.selectedRoles = this.selectedRolesService.selectedRoles;

    this.roleService.getRoles().subscribe(roles => {
      this.roleList = roles;
    });
  }
}


