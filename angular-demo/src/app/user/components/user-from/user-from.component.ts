import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Role} from "../../models/role";
import {MatChip} from "@angular/material/chips";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {RoleService} from "../../services/role.service";
import {SelectedRolesService} from "../../services/selected-roles.service";

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.css']
})

export class UserFromComponent implements OnInit {

  @Output()
  submitEvent:EventEmitter<User> = new EventEmitter<User>();
  @Input()
  placeholder:User;
  @Input()
  functionality:string
  submitted = false;
  roleList: Role[];
  selectedRoles: Role[] = [];
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    mobileNumber: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)]
  })

  toggleSelection(chip: MatChip, role: Role) {
    chip.toggleSelected();
    const index = this.selectedRoles.indexOf(role);
    if (chip.selected && index === -1) {
      this.selectedRoles.push(role);
    } else if (!chip.selected && index !== -1) {
      this.selectedRoles.splice(index, 1);
    }

    this.selectedRolesService.selectedRoles = this.selectedRoles;
  }

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    let isRegistration:boolean = this.functionality==="register";
    return this.submitted && firstNameControl?.hasError('required') && isRegistration || false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    let isRegistration:boolean = this.functionality==="register";
    return this.submitted && lastNameControl?.hasError('required') && isRegistration|| false;
  }

  showEmailError(): boolean {
    const emailControl = this.registerForm.get('email');
    let isRegistration:boolean = this.functionality==="register";
    return this.submitted && emailControl?.hasError('required') && isRegistration || false;
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
    const rolesIDs: number[] = this.selectedRoles.map(role => role.id)
    let newUser:User ={
      firstName,
      lastName,
      email,
      mobileNumber,
      rolesIDs,
    };
    if (this.functionality === "update"){
        newUser.id=this.placeholder.id;
        newUser.active = this.placeholder.active;
        newUser.newUser = this.placeholder.newUser;
        newUser.firstName = firstName === "" ? this.placeholder.firstName :firstName;
        newUser.lastName = lastName === "" ? this.placeholder.lastName :lastName;
        newUser.email = email === "" ? this.placeholder.email :email;
        newUser.mobileNumber = mobileNumber === "" ? this.placeholder.mobileNumber : mobileNumber;
        newUser.roles = this.selectedRoles
        newUser.rolesIDs= undefined
    }
    if(this.selectedRoles===[]){
      window.alert("you cannot" + this.functionality + "without a role")
    }else {
      if(this.functionality === "register"){
        if(this.registerForm.valid){
          this.submitEvent.emit(newUser)
        }
      }else{
        this.submitEvent.emit(newUser);
      }
    }
    this.registerForm.reset();
    this.selectedRoles = [];
  }

  constructor(private fb: FormBuilder,
              private roleService: RoleService,
              private selectedRolesService: SelectedRolesService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roleList = roles;
      this.selectedRoles = this.placeholder.roles as Role[];
    });
  }

}
