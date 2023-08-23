import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LogoutService} from "../../services/logout.service";
import {TranslocoService} from "@ngneat/transloco";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent{
  constructor(private router:Router,private service:LogoutService,private translocoService:TranslocoService) { }

  logout(){
    this.service.logout().subscribe(
      response => {
        localStorage.clear();
        this.router.navigate(['/login'])
      }
    )
  }

  onLanguageChange(){
    const lang=this.translocoService.getActiveLang();
    this.translocoService.setActiveLang(lang==='en'?'ro':'en');
  }

  isEnglSelected(){
    return this.translocoService.getActiveLang()==='en';
  }

  toggleMenu() {
    const menu = document.querySelector('.menu-icon') as HTMLElement | null;
    const navbar = document.querySelector('.menu') as HTMLElement | null;

    navbar?.classList.toggle('active');
    menu?.classList.toggle('move');
  }

  goToPage(page: string) {
    this.toggleMenu();
    if(page === 'users') {
      this.router.navigate(["/management/users/0/100"]);
    }
    if(page === 'donators'){
      this.router.navigate(["/management/donators/0/100"]);
    }
    if(page === 'campaigns'){
      this.router.navigate(["/management/campaigns/listing"]);
    }
  }



}
