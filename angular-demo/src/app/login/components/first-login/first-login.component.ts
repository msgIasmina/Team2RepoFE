import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent implements OnInit {

  passwdForm = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        this.validateSpecialChar,
        this.validateUppercase,
        this.validateNumber,
      ],
    ],
  });

  constructor(private fb: FormBuilder) { }

  validateSpecialChar(control: AbstractControl): { [key: string]: boolean } | null {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(control.value)) {
      return { specialChar: true };
    }
    return null;
  }

  validateUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    const uppercaseRegex = /[A-Z]/;
    if (!uppercaseRegex.test(control.value)) {
      return { uppercase: true };
    }
    return null;
  }

  validateNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const numberRegex = /[0-9]/;
    if (!numberRegex.test(control.value)) {
      return { number: true };
    }
    return null;
  }

  ngOnInit(): void {
  }

  onSave(){
    //salvat new password si setat newUser pe fals
  }

}
