import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donation} from "../../models/donation";
import {FormBuilder, Validators} from "@angular/forms";
import {Donator} from "../../../donator/models/donator";

@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css']
})
export class DonationFormComponent implements OnInit {

  @Output()
  submitEvent:EventEmitter<Donation> = new EventEmitter<Donation>();
  @Input()
  donation:Donation;
  @Input()
  functionality:string
  submitted=false;

  createForm = this.fb.group({
    amount: ['', Validators.required],
    currency: ['', Validators.required],
    createdBy: ['', Validators.required]
  })

  showAmountError():boolean{
    const amountControl = this.createForm.get('amount');
    let isAmount:boolean = this.functionality==="amount";
    return this.submitted && amountControl?.hasError('required') && isAmount || false;
  }
  showCurrencyError():boolean{
    const currencyControl = this.createForm.get('currency');
    let isCurrency:boolean = this.functionality==="currency";
    return this.submitted && currencyControl?.hasError('required') && isCurrency || false;
  }

  showCreatedByError():boolean{
    const createdByControl = this.createForm.get('createdBy');
    let isCreatedBy:boolean = this.functionality==="createdBy";
    return this.submitted && createdByControl?.hasError('required') && isCreatedBy || false;
  }

  onSave() {
    this.submitted = true;
    const amount = this.createForm.get('amount')?.value;
    const currency = this.createForm.get('currency')?.value;
    const createdBy = this.createForm.get('createdBy')?.value;

    let newDonation:Donation ={
      amount,
      currency,
      createdBy,
    };
    if (this.functionality === "update"){
      newDonation.id=this.donation.id;
    }
    if(this.createForm.valid){
      this.submitEvent.emit(newDonation)
      if (this.functionality === "register"){
        this.createForm.reset();
      }
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.functionality === "update"){
      this.createForm.setValue({
        amount: this.donation.amount,
        currency: this.donation.currency,
        createdBy: this.donation.createdBy
      })
    }
  }

}
