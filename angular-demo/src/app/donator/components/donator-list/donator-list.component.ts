import { Component, OnInit } from '@angular/core';
import { Donator } from '../../models/donator';
import { DonatorService } from '../../services/donator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DonatorAction } from '../../models/DonatorAction';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-donator-list',
  templateUrl: './donator-list.component.html',
  styleUrls: ['./donator-list.component.css'],
})
export class DonatorListComponent implements OnInit {
  donatorList: Donator[];
  totalItems: number;

  currentPage: number = 0; // Current page index
  pageSize: number = 5; // Items per page
  pageSizeOptions: number[] = [3, 5, 8]; // Options for page size

  constructor(
    private donatorService: DonatorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.currentPage = 0;
    this.pageSize = 5;
    this.donatorService.getSize().subscribe((totalItems) => {
      this.totalItems = totalItems;
    });
    this.loadDonatorsAndRefresh();
  }

  handleDonatorAction(action: DonatorAction) {
    if (action.type === 'delete') {
      this.deleteDonator(action.donator);
    } else if (action.type === 'edit') {
      this.editDonator(action.donator);
    }
  }

  private loadDonatorsAndRefresh() {
    this.donatorService
      .loadDonators(this.currentPage, this.pageSize)
      .subscribe(() => {
        this.donatorService.getDonators().subscribe((donators) => {
          this.donatorList = donators;
        });
      });
  }

  editDonator(donatorToEdit: Donator) {
    this.router.navigate(['/management/donators/update/' + donatorToEdit.id]);
  }

  private deleteDonator(donatorToDelete: Donator) {
    this.activatedRoute.params.subscribe(() => {
      this.donatorService.deleteDonator(donatorToDelete).subscribe(
        () => {
          this.toastr.success('Donator deleted successfully');
          this.loadDonatorsAndRefresh();
          this.donatorService.getSize().subscribe((size) => {
            this.totalItems = size;
          });
        },
        (error) => {
          this.toastr.error(error.message);
          this.loadDonatorsAndRefresh(); // Refresh the list after deletion
        },
      );
    });
  }

  onAddDonatorClicked() {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    const hasBenefPermission = permissions.includes(
      'AUTHORITY_BENEF_MANAGEMENT',
    );

    if (hasBenefPermission) {
      this.router.navigate(['/management/donators/register/']);
    } else {
      this.toastr.error(
        "It seems that you don't have the permissions for completing this action.",
      );
    }
  }

  pageChanged(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDonatorsAndRefresh();
  }
}
