import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css'],
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

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  validateSpecialChar(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(control.value)) {
      return { specialChar: true };
    }
    return null;
  }

  validateUppercase(
    control: AbstractControl,
  ): { [key: string]: boolean } | null {
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

  ngOnInit(): void {}

  onSave() {
    const password = this.passwdForm.get('password')?.value;
    const userId: string | null = localStorage.getItem('userId');
    this.service.firstLoginUpdate(userId, password).subscribe(
      (response) => {
        this.toastr.success(response.text);
        localStorage.setItem('newUser', 'false');
        this.router.navigate(['/management/home']);
      },
      (error) => this.toastr.error(error.message),
    );
  }
}
