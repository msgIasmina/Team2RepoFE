import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasePageComponent} from "./components/base-page/base-page.component";
import {ManagementRoutingModule} from "./management-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginGuard} from "./utils/utils/login-guard";
import {LogoutService} from "./services/logout.service";

@NgModule({
  declarations: [BasePageComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatToolbarModule,
    //CampaignsModule
  ],
  providers:[LoginGuard,LogoutService]
})
export class ManagementModule { }
