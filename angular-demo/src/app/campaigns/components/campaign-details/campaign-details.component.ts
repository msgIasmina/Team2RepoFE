import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../models/campaign";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  @Input() campaign:Campaign;
  @Output() campaignAction=new EventEmitter<Campaign>();

  constructor() { }

  ngOnInit(): void {
  }

  onEditClicked(campaign:Campaign){
    this.campaignAction.emit(campaign);
  }

  onDeleteClicked(campaign:Campaign){
    this.campaignAction.emit(campaign);
  }

}
