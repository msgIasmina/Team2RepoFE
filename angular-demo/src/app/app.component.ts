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

  users: User[] = [
    new User(1, 'user_email1@yahoo.com', 'pass1', 'user1',false, true, 'f1','l1'),
    new User(2, 'user_email2@yahoo.com', 'pass2', 'user2', false, false, 'f2','l2'),
    new User(3, 'user_email3@yahoo.com', 'pass3', 'user3', false, false, 'f3','l3')
  ];

  donations: Donation[] = [
    new Donation(1,20,'Euro',this.users[0]),
    new Donation(2,80,'Euro',this.users[0]),
    new Donation(3,77,'Ron',this.users[0]),
  ];

  toggleMenu() {
    const menu = document.querySelector('.menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.menu') as HTMLElement | null;

    navbar?.classList.toggle('active');
    menu?.classList.toggle('move');
  }
}
