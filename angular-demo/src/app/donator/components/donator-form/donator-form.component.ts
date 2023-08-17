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
  placeholder:Donator;
  @Input()
  functionality:string

  submitted = false;

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    additionalName: [''],
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
    const additionalName = this.registerForm.get('additionalName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;
    const maidenName = this.registerForm.get('maidenName')?.value;

    let newDonator:Donator ={
      firstName,
      additionalName,
      lastName,
      maidenName,
    };
    if (this.functionality === "update"){
      newDonator.id=this.placeholder.id;
      newDonator.firstName = firstName === "" ? this.placeholder.firstName :firstName;
      newDonator.additionalName = additionalName === "" ? this.placeholder.additionalName :additionalName;
      newDonator.maidenName = maidenName === "" ? this.placeholder.maidenName :maidenName;
    } else if(this.functionality === "register"){
      if(this.registerForm.valid){
        this.submitEvent.emit(newDonator)
      }else{
        this.submitEvent.emit(newDonator);
      }
    }

    this.registerForm.reset();
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
