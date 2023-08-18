import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donator} from "../../models/donator";
import {FormBuilder, Validators} from "@angular/forms";

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

  registerForm = this.fb.group({
    additionalName: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    maidenName: ['']
  })

  showFirstNameError(): boolean {
    const firstNameControl = this.registerForm.get('firstName');
    let isDonator:boolean = this.functionality==="donator";
    return this.submitted && firstNameControl?.hasError('required') && isDonator || false;
  }

  showLastNameError(): boolean {
    const lastNameControl = this.registerForm.get('lastName');
    let isDonator:boolean = this.functionality==="donator";
    return this.submitted && lastNameControl?.hasError('required') && isDonator|| false;
  }

  onSave() {
    this.submitted = true;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const maidenName = this.registerForm.get('maidenName')?.value;
    const additionalName = this.registerForm.get('additionalName')?.value;

    let newDonator:Donator ={
      firstName,
      additionalName,
      lastName,
      maidenName,
    };
    if (this.functionality === "update"){
      newDonator.id=this.donator.id;
    }
    if(this.registerForm.valid){
      this.submitEvent.emit(newDonator)
      if (this.functionality === "register"){
        this.registerForm.reset();
      }
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.functionality === "update"){
    this.registerForm.setValue({
      additionalName: this.donator.additionalName,
      firstName: this.donator.firstName,
      lastName: this.donator.lastName,
      maidenName: this.donator.maidenName
    })
    }
  }

}
