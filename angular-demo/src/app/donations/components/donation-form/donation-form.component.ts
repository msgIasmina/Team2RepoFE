import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Donation} from "../../models/donation";
import {FormBuilder, Validators} from "@angular/forms";
import {Donator} from "../../../donator/models/donator";
import {DonatorService} from "../../../donator/services/donator.service";

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

  form = this.fb.group({
    amount: ['', Validators.required],
    currency: ['', Validators.required],
    createdBy: ['', Validators.required],
    // benefactor: ['', Validators.required],
    // notes: ['']
  })
  donators: Donator[];

  showAmountError():boolean{
    const amountControl = this.form.get('amount');
    let isAmount:boolean = this.functionality==="amount";
    return this.submitted && amountControl?.hasError('required') && isAmount || false;
  }
  showCurrencyError():boolean{
    const currencyControl = this.form.get('currency');
    let isCurrency:boolean = this.functionality==="currency";
    return this.submitted && currencyControl?.hasError('required') && isCurrency || false;
  }

  showCreatedByError():boolean{
    const createdByControl = this.form.get('createdBy');
    let isCreatedBy:boolean = this.functionality==="createdBy";
    return this.submitted && createdByControl?.hasError('required') && isCreatedBy || false;
  }

  onSave() {
    this.submitted = true;
    const amount = this.form.get('amount')?.value;
    const currency = this.form.get('currency')?.value;
    const createdBy = this.form.get('createdBy')?.value;

    // let newDonation:Donation ={
    //   amount,
    //   currency,
    //   createdBy,
    //   // benefactor,
    //   // notes
    // };
    // if (this.functionality === "update"){
    //   newDonation.id=this.donation.id;
    // }
    // if(this.form.valid){
    //   this.submitEvent.emit(newDonation)
    //   if (this.functionality === "register"){
    //     this.form.reset();
    //   }
    // }
  }
  constructor(private fb: FormBuilder, private donatorService: DonatorService) { }

  ngOnInit(): void {
    this.donatorService.getDonators().subscribe((donators) => {
      this.donators = donators;
    });
    if(this.functionality === "update"){
      this.form.setValue({
        amount: this.donation.amount,
        currency: this.donation.currency,
        createdBy: this.donation.createdBy
      })
    }
  }

  // addDonator() {
  //   let benefactorToBeAdded = this.form.get('benefactor')?.value
  //   this.rolePermissionService.addPermissionsToRole(this.rolePermission.id, permissionsToBeAdded).subscribe(
  //     response => {
  //       /*this.missingPermissions = this.missingPermissions.filter(permission => permissionsToBeAdded.indexOf(permission)<0);
  //       this.acquiredPermissions.push(...permissionsToBeAdded);*/
  //     },
  //     err =>{
  //       //window.alert(err)
  //       this.missingPermissions = this.missingPermissions.filter(permission => permissionsToBeAdded.indexOf(permission)<0);
  //       this.acquiredPermissions.push(...permissionsToBeAdded);
  //     }
  //   )
  // }
}
