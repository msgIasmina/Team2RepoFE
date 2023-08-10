import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Role} from "../../models/role";
import {MatChip} from "@angular/material/chips";
import {UserService} from "../../services/user-service.service";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    phone: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)],
    roles: ['', Validators.required],
    // campaign: ['', Validators]
  })
  submitted = false;

  roleList: Role[] = [
    {roleName: "soething"},
    {roleName: "soething"},
    {roleName: "soething"},
    {roleName: "soething"},
];

 //  roleList: Role[];
  selectedRoles: Role[] = [];

  toggleSelection(chip: MatChip, role: Role) {
    chip.toggleSelected();
    const index = this.selectedRoles.indexOf(role);

    if (chip.selected && index === -1) {
      this.selectedRoles.push(role);
    } else if (!chip.selected && index !== -1) {
      this.selectedRoles.splice(index, 1);
    }
  }

  isSelected(role: Role): boolean {
    return this.roleList.indexOf(role) !== -1;
  }

  onSave() {
    console.log(this.registerForm.value);
  }

  constructor(private fb: FormBuilder, private roleService: RoleService) {
  }
  ngOnInit(): void {
    //this.roleService.loadRoles().subscribe();
    //this.roleService.getRoles().subscribe((roles) => this.roleList = roles);
  }

  get f() {
    return this.registerForm.controls;
  }
}
