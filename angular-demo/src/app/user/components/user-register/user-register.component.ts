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
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)],
    roles: ['', Validators.required],
    // campaign: ['', Validators]
  })
  submitted = false;

  roleList: Role[] = [
    {roleName: "1"},
    {roleName: "2"},
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

  /* Error Messages */
    showFirstNameError(): boolean {
      const firstNameControl = this.registerForm.get('firstName');
      return this.submitted && firstNameControl?.hasError('required') || false;
    }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    return this.submitted && lastNameControl?.hasError('required') || false;
  }

  showEmailError(): boolean {
    const emailControl = this.registerForm.get('email');
    return this.submitted && emailControl?.hasError('required') || false;
  }



  isSelected(role: Role): boolean {
    return this.roleList.indexOf(role) !== -1;
  }

  onSave() {
    this.submitted = true;
    if (this.registerForm.valid) {
      // Handle form submission here
      console.log(this.registerForm.value);
    }else{
      console.log("ERROR: registerForm is not valid");
    }
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
