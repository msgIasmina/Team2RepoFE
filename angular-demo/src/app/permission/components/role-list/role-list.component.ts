import { Component, OnInit } from '@angular/core';
import {RolePermission} from "../../models/role-permission";
import {RolePermissionService} from "../../services/role-permission.service";
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

  constructor(private rolePermissionService: RolePermissionService) { }

  ngOnInit(): void {
    //this.loadRolePermissionsAndRefresh();
    // ?
  }

  handleRolePermissionAction(action: RolePermissionAction){
    if(action.type === 'addNewPermissions'){
      this.addNewPermissions(action.rp);
    }else if(action.type === 'removeCurrentPermissions'){
      this.removeCurrentPermissions(action.rp);
    }
  }

  addNewPermissions(rp: RolePermission) {

  }
  //TODO: loadAndRefresh?


  private removeCurrentPermissions(rp: RolePermission) {

  }
}
