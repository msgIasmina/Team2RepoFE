import { Component } from '@angular/core';
import {User} from './user/models/user';
import {Donation} from "./donations/models/donation";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'untitled5';

  toggleMenu() {
    const menu = document.querySelector('.menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.menu') as HTMLElement | null;

    navbar?.classList.toggle('active');
    menu?.classList.toggle('move');
  }
}
