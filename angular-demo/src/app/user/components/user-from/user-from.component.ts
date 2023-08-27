import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Role} from "../../models/role";
import {MatChip} from "@angular/material/chips";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {RoleService} from "../../services/role.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.css']
})

export class UserFromComponent implements OnInit {

  @Output()
  submitEvent:EventEmitter<User> = new EventEmitter<User>();
  @Input()
  user:User;
  @Input()
  functionality:string
  submitted = false;
  roleList: Role[] =[];
  selectedRoles: Role[] = [];
  registerForm:FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobileNumber: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)]
  })

  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private toastr:ToastrService) {
  }

  // toggleSelection(chip: MatChip, role: Role) {
  //   chip.toggleSelected();
  //   const index = this.selectedRoles.indexOf(role);
  //   if (chip.selected && index === -1) {
  //     this.selectedRoles.push(role);
  //   } else if (!chip.selected && index !== -1) {
  //     this.selectedRoles.splice(index, 1);
  //   }
  // }

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    if (this.functionality === "register"){
      return this.submitted && firstNameControl?.hasError('required') || false;
    } else if (this.functionality === "update"){
      return firstNameControl?.hasError('required') || false;
    }
    return false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    if (this.functionality === "register"){
      return this.submitted && lastNameControl?.hasError('required') || false;
    } else if (this.functionality === "update"){
      return lastNameControl?.hasError('required') || false;
    }
    return false;
  }

  showEmailError(): boolean {
    const emailControl = this.registerForm.get('email');
    if(this.functionality==="register"){
      return this.submitted && emailControl?.hasError('required') || false;
    }else if (this.functionality === "update"){
      return emailControl?.hasError('required') || false;
    }
    return false;
  }

  showRolesError(): boolean {
    if (this.functionality === "register"){
      return this.submitted && this.selectedRoles.length === 0;
    } else if (this.functionality === "update") {
      return this.selectedRoles.length === 0;
    }
    return false;
  }

  getFilteredRole(role:Role){
   return  this.selectedRoles.filter(selectedRole => selectedRole.name===role.name)
  }

  onSave() {
    this.submitted = true;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const email = this.registerForm.get('email')?.value;
    const mobileNumber = this.registerForm.get('mobileNumber')?.value;
    const roles = this.selectedRoles;
    let newUser:User ={
      firstName,
      lastName,
      email,
      mobileNumber,
      roles
    };
    if (this.functionality === "update"){
        newUser.id=this.user.id;
        newUser.active = this.user.active;
        newUser.newUser = this.user.newUser;
        newUser.roles = this.selectedRoles
    }
        if(this.registerForm.valid && this.selectedRoles.length !== 0){
          this.submitEvent.emit(newUser)
          } else {
          this.toastr.show("Please make sure that your name contains only letters and all required fields are filled in");
        }
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roleList = roles;
      this.selectedRoles = this.user.roles as Role[];
    });
    if(this.functionality==="update") {
      this.registerForm.setValue({
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'email': this.user.email,
        'mobileNumber': this.user.mobileNumber,
      })
    }
  }

  getChipClass(role: Role): string {
    if (this.isSelected(role)) {
      return 'selected-chip';
    } else {
      return '';
    }
  }

  isSelected(role: Role): boolean {
    let filteredRole = this.getFilteredRole(role);
    return (filteredRole.length > 0)
  }

  toggleSelection(c: MatChip, role: Role): void {
    const index = this.selectedRoles.indexOf(this.getFilteredRole(role)[0]);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }

  getChipBackgroundColor(role: Role): string {
    if (this.getChipClass(role) === 'selected-chip') {
      return '#Fa5353';
    } else {
      return ''; // No background color
    }
  }
}
