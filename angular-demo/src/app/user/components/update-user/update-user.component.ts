import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{

  user:User;
  id:number;
  update:string="update"
  constructor (private activatedRoute: ActivatedRoute,private userService:UserService) {
  }

  updateUser(user:User){
    this.userService.updateUser(user).subscribe(
      response => window.alert(response)
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.userService.findUserById(this.id).subscribe(
        placeholder => {
          this.user = placeholder
        })
    })
  }
}
