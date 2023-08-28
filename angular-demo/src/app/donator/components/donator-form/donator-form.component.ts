import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Donator } from '../../models/donator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-donator-form',
  templateUrl: './donator-form.component.html',
  styleUrls: ['./donator-form.component.css'],
})
export class DonatorFormComponent implements OnInit {
  @Output() submitEvent: EventEmitter<Donator> = new EventEmitter<Donator>();
  @Input() donator: Donator;
  @Input() functionality: string;
  submitted = false;

  registerForm: FormGroup = this.fb.group({
    additionalName: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    maidenName: [''],
  });

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    let isRegistration: boolean = this.functionality === 'register';
    return (
      (this.submitted &&
        firstNameControl?.hasError('required') &&
        isRegistration) ||
      false
    );
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    let isRegistration: boolean = this.functionality === 'register';
    return (
      (this.submitted &&
        lastNameControl?.hasError('required') &&
        isRegistration) ||
      false
    );
  }

  onSave() {
    if (!this.registerForm.valid) {
      this.toastr.error(
        'The form is invalid. Please check the required fields.',
      );
      return;
    }
    this.submitted = true;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const maidenName = this.registerForm.get('maidenName')?.value;
    const additionalName = this.registerForm.get('additionalName')?.value;
    let newDonator: Donator = {
      firstName,
      lastName,
      additionalName,
      maidenName,
    };

    if (this.functionality === 'update') {
      newDonator.id = this.donator.id;
    }

    this.submitEvent.emit(newDonator);
  }

  ngOnInit(): void {
    if (this.functionality === 'update') {
      this.registerForm.setValue({
        additionalName: this.donator.additionalName,
        firstName: this.donator.firstName,
        lastName: this.donator.lastName,
        maidenName: this.donator.maidenName,
      });
    }
  }
}
