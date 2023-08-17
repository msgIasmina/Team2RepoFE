import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RolePermission} from "../../models/role-permission";
import {FormBuilder, FormControl} from "@angular/forms";
import {Permission} from "../../../user/models/permission";
import {RolePermissionService} from "../../services/role-permission.service";
import {RolePermissionAction} from "../role-list/role-list.component";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  @Input() rolePermission: RolePermission;
  @Output() rolePermissionAction= new EventEmitter<RolePermissionAction>();


  permissionsToBeAdded:FormControl = new FormControl('');
  missingPermissions: Permission[] = [];

  permissionsToBeDeleted:FormControl = new FormControl('');
  acquiredPermissions: Permission[] = [];

  constructor(private fb: FormBuilder, private rolePermissionService: RolePermissionService) {
  }

  ngOnInit(): void {
    this.missingPermissions = this.rolePermission.missingPermissions;
    this.acquiredPermissions = this.rolePermission.acquiredPermissions;
  }

  addPermissions():void{
    const newlySelectedPermissions = this.permissionsToBeAdded.value;



  }
  removePermissions() {

  }
}
