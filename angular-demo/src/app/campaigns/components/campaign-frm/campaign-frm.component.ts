import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {FormBuilder, Validators} from "@angular/forms";
import {AccountService} from "../../../account/component/login/services/account.service";
import {CampaignService} from "../../services/campaign.service";

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

  constructor(private fb: FormBuilder,
              private campaignService: CampaignService) { }

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

    if (!this.campaignForm.valid) {
      console.log("Invalid Campaign form!");
      return;
    }

    const name=this.campaignForm.get('name')?.value;
    const purpose=this.campaignForm.get('purpose')?.value;

    let newCampaign:Campaign={
      name,
      purpose
    };

    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasCampPermission = permissions.includes('AUTHORITY_CAMP_MANAGEMENT');
    if(this.functionality==="update"){
      newCampaign.id=this.campaign.id;
    }

    this.submitEvent.emit(newCampaign);

    if(this.functionality === "add" && hasCampPermission) {
      window.alert("Campaign added successfully!");
      window.location.href = '/management/campaigns/listing';
    } else{
      window.alert('User does not have CAMP management permission.');
      return;
    }

  }

}
