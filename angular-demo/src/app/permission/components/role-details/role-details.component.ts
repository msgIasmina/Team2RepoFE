import {Component, Input, OnInit} from '@angular/core';
import {RolePermission} from "../../models/role-permission";
import {FormBuilder, FormControl} from "@angular/forms";
import {Permission} from "../../../user/models/permission";
import {RolePermissionService} from "../../services/role-permission.service";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  @Input() rolePermission: RolePermission;


  permissionsToBeAdded: FormControl = new FormControl('');
  missingPermissions: Permission[] = [];

  permissionsToBeDeleted: FormControl = new FormControl('');
  acquiredPermissions: Permission[] = [];

  constructor(private fb: FormBuilder, private rolePermissionService: RolePermissionService) {
  }

  ngOnInit(): void {
    this.missingPermissions = this.rolePermission.missingPermissions;
    this.acquiredPermissions = this.rolePermission.acquiredPermissions;
  }

  addPermissions(): void {
    const newlySelectedPermissions = this.permissionsToBeAdded.value;
    this.rolePermissionService.addPermissionsToRole(this.rolePermission.id, newlySelectedPermissions).subscribe(
      response => console.log(response)
    )
  }


  removePermissions() {
    const newlyRemovedPermissions = this.permissionsToBeDeleted.value;
    this.rolePermissionService.removePermissionsFromRole(this.rolePermission.id, newlyRemovedPermissions).subscribe(
      response => console.log(response)
    )
  }
}
