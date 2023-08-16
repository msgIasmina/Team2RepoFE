import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DonationsModule} from "./donations/donations.module";
import {AppRoutingModule} from './app-routing.module';
import {LoginModule} from "./login/login.module";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginService} from "./login/services/login.service";
import {Interceptor} from "./util/interceptors/interceptor";
import {RoleGuard} from "./util/Roleguard";
import {ManagementModule} from "./management/management.module";
import { DonatorDetailsComponent } from './donator/components/donator-details/donator-details.component';
import { DonatorListComponent } from './donator/components/donator-list/donator-list.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    DonatorDetailsComponent,
    DonatorListComponent,
  ],
  imports: [
    BrowserModule,
    DonationsModule,
    LoginModule,
    ManagementModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule
  ],
  providers: [
    LoginService, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true},RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule{}
