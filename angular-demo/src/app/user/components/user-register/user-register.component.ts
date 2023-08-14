import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Role} from "../../models/role";
import {MatChip} from "@angular/material/chips";
import {RoleService} from "../../services/role.service";
import {User} from "../../models/user";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  // userFirstName: string = '';
  // userLastName: string = '';
  // userEmailAddress: string = '';
  // userMobileNumber: string = '';

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    mobileNumber: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)],
    roles: ['', Validators.required],
    // campaign: ['', Validators]
  })
  submitted = false;

  selectedRoles: Role[] = [];
  roleList: Role[];

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
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const email = this.registerForm.get('email')?.value;
    const mobileNumber = this.registerForm.get('mobileNumber')?.value;
    const roles = this.registerForm.get('roles')?.value;

    const newUser = new User(firstName,lastName,email,mobileNumber,roles)

    this.userService.saveUser(newUser).subscribe(() => this.userService.loadUsers());
    console.log(this.registerForm.value);


  }

  constructor(private fb: FormBuilder, private roleService: RoleService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    //this.roleService.loadRoles().subscribe();
    this.roleService.getRoles().subscribe((roles) => this.roleList = roles);
    console.log(this.roleList);
  }

  get f() {
    return this.registerForm.controls;
  }


}
