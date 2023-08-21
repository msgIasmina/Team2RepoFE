import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from "../../environments/environment";
import { initializeApp } from "firebase/app";
import { NotificationComponent } from './component/notification/notification.component';
initializeApp(environment.firebase);



@NgModule({
  declarations: [
    NotificationComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { }
