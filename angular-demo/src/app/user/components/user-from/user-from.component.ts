import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Role} from "../../models/role";
import {MatChip} from "@angular/material/chips";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {RoleService} from "../../services/role.service";

@Component({
  selector: 'app-user-from',
  templateUrl: './user-from.component.html',
  styleUrls: ['./user-from.component.css']
})
export class UserFromComponent implements OnInit {
  selectedRoles: Role[] = [];
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    mobileNumber: ['', Validators.pattern(/^(00407|07|\+407)\d{8}$/)]
  })
  submitted = false;
  @Output()
  submitEvent:EventEmitter<User> = new EventEmitter<User>();
  @Input()
  placeholder:User;


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

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName')?.value;
    return this.submitted && firstNameControl?.hasError('required') || false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName')?.value;
    return this.submitted && lastNameControl?.hasError('required') || false;
  }

  showEmailError(): boolean {
    const emailControl = this.registerForm.get('email')?.value;
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
    const rolesIDs: number[] = this.selectedRoles.map(role => role.id)
    let id = this.placeholder.id
    const newUser: User = {
      firstName,
      lastName,
      email,
      mobileNumber,
      rolesIDs,
      id
    };
    console.log(newUser)
    this.submitEvent.emit(newUser);
    this.registerForm.reset();
    this.selectedRoles = [];
  }

  constructor(private fb: FormBuilder,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((roles) => {
      this.roleList = roles;
      this.placeholder.rolesIDs.forEach(id=>{
        let role:Role|undefined = roles.find(role => role.id === id);
        if(role !== undefined){
          this.selectedRoles.push(role);
        }
      })
    });
  }

}
