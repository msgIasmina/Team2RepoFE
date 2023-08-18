import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-campaign-frm',
  templateUrl: './campaign-frm.component.html',
  styleUrls: ['./campaign-frm.component.css']
})
export class CampaignFrmComponent implements OnInit {

  @Output()
  submitEvent:EventEmitter<Campaign>=new EventEmitter<Campaign>();
  @Input()
  campaign:Campaign;
  @Input()
  functionality:string
  submitted=false
  campaignForm=this.fb.group({
    name:['',Validators.required],
    purpose:['',Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.campaign)
    if(this.functionality === "update"){
      this.campaignForm.setValue({
        name:this.campaign.name,
        purpose:this.campaign.purpose
      })
    }
  }

  onSave(){
    this.submitted=true;
    const name=this.campaignForm.get('name')?.value;
    const purpose=this.campaignForm.get('purpose')?.value;
    let newCampaign:Campaign={
      name,
      purpose
    };
    if(this.functionality==="update"){
      newCampaign.id=this.campaign.id;
    }
    if(this.campaignForm.valid){
      this.submitEvent.emit(newCampaign);
      if(this.functionality === "add"){
        this.campaignForm.reset();
      }
    }
  }

}
