import {Component, Input, OnInit} from '@angular/core';
import {RolePermission} from "../../models/role-permission";
import {Permission} from "../../../user/models/permission";
import {RolePermissionService} from "../../services/role-permission.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  @Input() rolePermission: RolePermission;
  missingPermissions: Permission[] = [];
  acquiredPermissions: Permission[] = [];
  form:FormGroup = this.fb.group({
    permissionsToBeAdded : [''],
    permissionsToBeDeleted :['']
  })
  constructor( private rolePermissionService: RolePermissionService,private fb:FormBuilder,
               private router: Router,
               private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.missingPermissions = this.rolePermission.missingPermissions;
    this.acquiredPermissions = this.rolePermission.acquiredPermissions;
  }

  addPermissions(): void {
    let permissionsToBeAdded = this.form.get('permissionsToBeAdded')?.value
    this.rolePermissionService.addPermissionsToRole(this.rolePermission.id, permissionsToBeAdded).subscribe(
      response => {
        /*this.missingPermissions = this.missingPermissions.filter(permission => permissionsToBeAdded.indexOf(permission)<0);
        this.acquiredPermissions.push(...permissionsToBeAdded);*/
        this.toastr.success("Permissions added successfully")
      },
      err =>{
        //window.alert(err)
        this.toastr.error(err.message);
        this.missingPermissions = this.missingPermissions.filter(permission => permissionsToBeAdded.indexOf(permission)<0);
        this.acquiredPermissions.push(...permissionsToBeAdded);
      }
    )
  }

  removePermissions() {
    let permissionsToBeRemoved = this.form.get('permissionsToBeDeleted')?.value
    this.rolePermissionService.removePermissionsFromRole(this.rolePermission.id, permissionsToBeRemoved).subscribe(
      response => {
        /*this.acquiredPermissions = this.acquiredPermissions.filter(permission => permissionsToBeRemoved.indexOf(permission)<0);
        this.missingPermissions.push(...permissionsToBeRemoved);*/
        this.toastr.success("Permissions removed successfully.")
      },
      err =>{
        this.toastr.error(err.message);
        this.acquiredPermissions = this.acquiredPermissions.filter(permission => permissionsToBeRemoved.indexOf(permission)<0);
        this.missingPermissions.push(...permissionsToBeRemoved);
        //window.alert(err);
      }
    )
  }

  backtoUserList(){
    this.router.navigate(["/management/users/list"]);
  }
}
