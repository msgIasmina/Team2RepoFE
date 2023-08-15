import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {DonatorService} from "../../services/donator.service";
import {Donator} from "../../models/donator";

@Component({
  selector: 'app-donator-register',
  templateUrl: './donator-register.component.html',
  styleUrls: ['./donator-register.component.css']
})
export class DonatorRegisterComponent implements OnInit {

  donatorList: Donator[];
  constructor(private fb: FormBuilder,
              private donatorService: DonatorService) { }

  ngOnInit(): void {
    this.donatorService.getDonators().subscribe((donators) => this.donatorList = donators);
  }

  submitted = false;

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    additionalName: [''],
    maidenName: [''],
  })

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    return this.submitted && firstNameControl?.hasError('required') || false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    return this.submitted && lastNameControl?.hasError('required') || false;
  }

  onSave(){
    this.submitted = true;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const additionalName = this.registerForm.get('additionalName')?.value;
    const maidenName = this.registerForm.get('maidenName')?.value;

    const newDonator: Donator = {
      firstName,
      lastName,
      additionalName,
      maidenName
    };

    this.donatorService.saveDonator(newDonator).subscribe(()=>{
      this.registerForm.reset();
    })
  }
}
