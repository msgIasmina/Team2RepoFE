import { Component } from '@angular/core';
import { DonatorService } from '../../services/donator.service';
import { Donator } from '../../models/donator';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-donator-register',
  templateUrl: './donator-register.component.html',
  styleUrls: ['./donator-register.component.css'],
})
export class DonatorRegisterComponent {
  placeholder: Donator = new Donator(
    'First Name',
    'Last Name',
    'Additional Name',
    'Maiden Name',
  );
  register: string = 'register';

  constructor(
    private donatorService: DonatorService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  onSave(newDonator: Donator) {
    this.donatorService.saveDonator(newDonator).subscribe(
      (response) => {
        this.toastr.success(response.text);
      },
      (error) => {
        this.toastr.error(error.error);
      },
    );
    this.router.navigate(['/management/donators/list']);
  }
}
