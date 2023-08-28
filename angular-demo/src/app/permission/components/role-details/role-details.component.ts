import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolePermission } from '../../models/role-permission';
import { Permission } from '../../../user/models/permission';
import { RolePermissionService } from '../../services/role-permission.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  @Input() rolePermission: RolePermission;
  @Output() changesMade: EventEmitter<any> = new EventEmitter<any>();
  missingPermissions: Permission[] = [];
  acquiredPermissions: Permission[] = [];
  form: FormGroup = this.fb.group({
    permissionsToBeAdded: [''],
    permissionsToBeDeleted: [''],
  });

  constructor(
    private rolePermissionService: RolePermissionService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.missingPermissions = this.rolePermission.missingPermissions;
    this.acquiredPermissions = this.rolePermission.acquiredPermissions;
  }

  addPermissions(): void {
    let permissionsToBeAdded = this.form.get('permissionsToBeAdded')?.value;
    this.rolePermissionService
      .addPermissionsToRole(this.rolePermission.id, permissionsToBeAdded)
      .subscribe(
        (response) => {
          this.toastr.success(response.text);
          this.changesMade.emit();
        },
        (err) => {
          this.toastr.error(err.error);
          this.changesMade.emit();
        },
      );
  }

  removePermissions() {
    let permissionsToBeRemoved = this.form.get('permissionsToBeDeleted')?.value;
    this.rolePermissionService
      .removePermissionsFromRole(this.rolePermission.id, permissionsToBeRemoved)
      .subscribe(
        (response) => {
          this.toastr.success(response.text);
        },
        (err) => {
          this.toastr.error(err.error);
        },
      );
  }

  backtoUserList() {
    this.router.navigate(['/management/users/list']);
  }
}
