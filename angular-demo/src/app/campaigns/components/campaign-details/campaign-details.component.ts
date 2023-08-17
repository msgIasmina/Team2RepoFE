import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Campaign} from "../../models/campaign";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {

  @Input() campaign:Campaign;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  onEditClicked(campaign:Campaign){
    this.router.navigate(["/management/campaigns/edit/"+campaign.id]);
  }

}
