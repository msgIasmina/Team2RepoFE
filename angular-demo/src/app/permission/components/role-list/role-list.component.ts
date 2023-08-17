import {Component, OnInit} from '@angular/core';
import {RolePermission} from "../../models/role-permission";
import {RolePermissionService} from "../../services/role-permission.service";
import {ActivatedRoute} from "@angular/router";

export interface RolePermissionAction {
  rp: RolePermission,
  type: 'addNewPermissions' | 'removeCurrentPermissions';
}

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  rolePermissionsList: RolePermission[];
  id: number;

  constructor(private rolePermissionService: RolePermissionService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
    })
    this.rolePermissionService.loadRolePermissions(this.id).subscribe(
      rolePermissions => {
        this.rolePermissionsList = rolePermissions
      }
    )

  }


}
