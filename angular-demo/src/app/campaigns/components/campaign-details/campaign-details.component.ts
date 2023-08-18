import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {CampaignAction} from "../../../user/models/CampaignAction";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  @Input() campaign:Campaign;
  @Output() emmitter=new EventEmitter<CampaignAction>();
  constructor() { }

  ngOnInit(): void {
  }

  onEditClicked(campaign:Campaign){
    const action:CampaignAction={campaign,type:'edit'};
    this.emmitter.emit(action);
  }

  onDeleteClicked(campaign:Campaign){
    const action:CampaignAction={campaign,type:'delete'};
    this.emmitter.emit(action);
  }

}
