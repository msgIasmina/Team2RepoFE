import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageComponent } from './components/base-page/base-page.component';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { LoginGuard } from '../account/component/utils/login-guard';
import { UserManagemntGuard } from '../account/component/utils/user-managemnt-guard';
import { BenefManagementGuard } from '../account/component/utils/benef-management-guard';
import { DonationManagementGuard } from '../account/component/utils/donation-management-guard';
import { CampManagementGuard } from '../account/component/utils/camp-management-guard';

const routes: Routes = [
  {
    path: 'management',
    component: BasePageComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../homePage/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
        canActivate: [UserManagemntGuard],
      },
      {
        path: 'campaigns',
        loadChildren: () =>
          import('../campaigns/campaigns.module').then(
            (m) => m.CampaignsModule,
          ),
        canActivate: [CampManagementGuard],
      },
      {
        path: 'donators',
        loadChildren: () =>
          import('../donator/donator.module').then((m) => m.DonatorModule),
        canActivate: [BenefManagementGuard],
      },
      {
        path: 'donations',
        loadChildren: () =>
          import('../donations/donations.module').then(
            (m) => m.DonationsModule,
          ),
        canActivate: [DonationManagementGuard],
      },
      { path: 'notifications', component: NotificationsListComponent },
    ],
    canActivate: [LoginGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
