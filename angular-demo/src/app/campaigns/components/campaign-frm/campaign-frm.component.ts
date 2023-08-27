import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Campaign } from '../../models/campaign';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-campaign-frm',
  templateUrl: './campaign-frm.component.html',
  styleUrls: ['./campaign-frm.component.css'],
})
export class CampaignFrmComponent implements OnInit {
  @Output() submitEvent: EventEmitter<Campaign> = new EventEmitter<Campaign>();
  @Input() campaign: Campaign;
  @Input() functionality: string;
  submitted = false;
  campaignForm = this.fb.group({
    name: ['', Validators.required],
    purpose: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.functionality === 'update') {
      this.campaignForm.setValue({
        name: this.campaign.name,
        purpose: this.campaign.purpose,
      });
    }
  }

  onSave() {
    this.submitted = true;

    if (!this.campaignForm.valid) {
      this.toastr.error(
        'Invalid campaign form! Please check the required fields.',
      );
      return;
    }

    const name = this.campaignForm.get('name')?.value;
    const purpose = this.campaignForm.get('purpose')?.value;

    let newCampaign: Campaign = {
      name,
      purpose,
    };

    if (this.functionality === 'update') {
      newCampaign.id = this.campaign.id;
    }

    this.submitEvent.emit(newCampaign);

    if (this.functionality === 'add') {
      this.toastr.success('Campaign added successfully!');
      window.location.href = '/management/campaigns/listing';
    }
  }
}
