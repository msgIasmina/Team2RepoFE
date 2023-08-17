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

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    DonationsModule,
    LoginModule,
    ManagementModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoginService, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}, RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
