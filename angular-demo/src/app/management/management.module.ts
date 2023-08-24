import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasePageComponent} from "./components/base-page/base-page.component";
import {ManagementRoutingModule} from "./management-routing.module";
import {MatToolbarModule} from "@angular/material/toolbar";
import {LoginGuard} from "./utils/utils/login-guard";
import {LogoutService} from "./services/logout.service";
import {ToastrModule} from "ngx-toastr";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {TranslocoModule} from "@ngneat/transloco";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {NotificationComponent} from './components/notification/notification.component';
import {NotificationsListComponent} from './components/notifications-list/notifications-list.component';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [BasePageComponent, NotificationComponent, NotificationsListComponent],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatToolbarModule,
    ToastrModule.forRoot(),
    MatMenuModule,
    TranslocoModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule
  ],
  providers: [LoginGuard, LogoutService]
})
export class ManagementModule {
}
