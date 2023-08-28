import { Component, OnInit } from '@angular/core';
import { Donator } from '../../models/donator';
import { DonatorService } from '../../services/donator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-donator',
  templateUrl: './update-donator.component.html',
  styleUrls: ['./update-donator.component.css'],
})
export class UpdateDonatorComponent implements OnInit {
  donator: Donator;
  id: number;
  update: string = 'update';

  constructor(
    private donatorService: DonatorService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  updateDonator(donator: Donator) {
    this.donatorService.updateDonator(donator).subscribe(
      (response) => this.toastr.success(response.text),
      (error) => {
        this.toastr.error(error.error);
      },
    );
    this.router.navigate(['/management/donators/list']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.donatorService.findDonatorById(this.id).subscribe((donatorData) => {
        this.donator = donatorData;
      });
    });
  }

}
