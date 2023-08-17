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
  placeholder:Campaign;
  @Input()
  functionality:string
  submitted=false
  campaignForm=this.fb.group({
    name:['',Validators.required],
    purpose:['',Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
      newCampaign.id=this.placeholder.id;
      newCampaign.name= name ===""? this.placeholder.name : name;   //check if duplicate name
      newCampaign.purpose=purpose ===""? this.placeholder.purpose : purpose;
    }else{
      if(this.functionality==="add"){
        if(this.campaignForm.valid){
          this.submitEvent.emit(newCampaign);
        }
      }else {
        this.submitEvent.emit(newCampaign);
      }
    }
    this.campaignForm.reset();
  }

}
