import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DonatorRegisterComponent } from './components/donator-register/donator-register.component';
import { DonatorListComponent } from './components/donator-list/donator-list.component';
import { DonatorDetailsComponent } from './components/donator-details/donator-details.component';
import { UpdateDonatorComponent } from './components/update-donator/update-donator.component';

const routes: Routes = [
  { path: 'update/:id', component: UpdateDonatorComponent },
  {
    path: 'list',
    component: DonatorListComponent,
  },
  { path: 'details', component: DonatorDetailsComponent },
  { path: 'register', component: DonatorRegisterComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonatorRoutingModule {}
