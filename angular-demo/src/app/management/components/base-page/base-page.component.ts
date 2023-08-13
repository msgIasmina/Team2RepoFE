import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout.service";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent implements OnInit {

  constructor(private router:Router,private service:LogoutService) { }

  ngOnInit(): void {
  }

  logout(){
    this.service.logout().subscribe(
      response => {
        localStorage.clear();
        this.router.parseUrl("/login")
      },
      error => window.alert("Couldn't logout")
    )
  }

}
