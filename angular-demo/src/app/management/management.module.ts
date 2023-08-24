import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BasePageComponent} from "./components/base-page/base-page.component";
import {ManagementRoutingModule} from "./management-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginGuard} from "../account/component/login/utils/login-guard";
import {LogoutService} from "./services/logout.service";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [BasePageComponent],
    imports: [
        CommonModule,
        ManagementRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        //CampaignsModule
    ],
  providers:[LoginGuard,LogoutService]
})
export class ManagementModule { }
