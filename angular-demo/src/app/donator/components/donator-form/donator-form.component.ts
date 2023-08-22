import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donator} from "../../models/donator";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonatorService} from "../../services/donator.service";

@Component({
  selector: 'app-donator-form',
  templateUrl: './donator-form.component.html',
  styleUrls: ['./donator-form.component.css']
})
export class DonatorFormComponent implements OnInit {

  @Output()
  submitEvent:EventEmitter<Donator> = new EventEmitter<Donator>();
  @Input()
  donator:Donator;
  @Input()
  functionality:string
  submitted = false;

  registerForm:FormGroup = this.fb.group({
    additionalName: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    maidenName: ['']
  })

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    let isRegistration:boolean = this.functionality==="register";
    return this.submitted && firstNameControl?.hasError('required') && isRegistration || false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    let isRegistration:boolean = this.functionality==="register";
    return this.submitted && lastNameControl?.hasError('required') && isRegistration || false;
  }

  onSave() {
    if (!this.registerForm.valid) {
      console.log("Invalid Campaign form!");
      return;
    }
    this.submitted = true;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const maidenName = this.registerForm.get('maidenName')?.value;
    const additionalName = this.registerForm.get('additionalName')?.value;
    let newDonator:Donator ={
      firstName,
      lastName,
      additionalName,
      maidenName,
    };

    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasBenefPermission = permissions.includes('AUTHORITY_BENEF_MANAGEMENT');
    if (this.functionality === "update"){
      newDonator.id=this.donator.id;
    }

    this.submitEvent.emit(newDonator)

    if (this.functionality === "register" && hasBenefPermission){
      window.alert("Successfully Donator Registered!");
      window.location.href = '/management/donators/0/10';
    } else{
      window.alert('User does not have BENEF management permission.');
      return;
    }

  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.functionality === "update"){
    this.registerForm.setValue({
      "additionalName": this.donator.additionalName,
      "firstName": this.donator.firstName,
      "lastName": this.donator.lastName,
      "maidenName": this.donator.maidenName
    })
    }
  }

}
