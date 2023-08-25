import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DonationsModule} from "./donations/donations.module";
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginModule} from "./account/component/login/login.module";
import {Interceptor} from "./util/interceptors/interceptor";
import {RoleGuard} from "./util/Roleguard";
import {ManagementModule} from "./management/management.module";
import {AccountService} from "./account/component/login/services/account.service";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import { HomeComponent } from './homePage/components/home/home.component';
import { TranslocoRootModule } from './transloco-root.module';

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
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    TranslocoRootModule
  ],
  providers: [
    AccountService, {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}, RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
