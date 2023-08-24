import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RoleGuard} from "./util/Roleguard";
import {SupportedBrowserGuard} from "./util/SupportedBrowserGuard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: "home",
    loadChildren: () => import('./homePage/home.module').then(m => m.HomeModule),
    canActivate: [RoleGuard, SupportedBrowserGuard]
  },
  // {
  //   path: "users",
  //   loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  //   canActivate: [RoleGuard, UserPermissionGuard, SupportedBrowserGuard]
  // },
  // {
  //   path: "donators",
  //   loadChildren: () => import('./donator/donator.module').then(m => m.DonatorModule),
  //   canActivate: [RoleGuard, DonatorPermissionGuard, SupportedBrowserGuard]
  // },
  // {
  //   path: "donations",
  //   loadChildren: () => import('./donations/donations.module').then(m => m.DonationsModule),
  //   canActivate: [RoleGuard, DonationPermissionGuard, SupportedBrowserGuard]
  // },
  // {
  //   path: "campaigns",
  //   loadChildren: () => import('./campaigns/campaigns.module').then(m => m.CampaignsModule),
  //   canActivate: [RoleGuard, CampaignPermissionGuard, SupportedBrowserGuard]
  // }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ], exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
