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
  }
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
