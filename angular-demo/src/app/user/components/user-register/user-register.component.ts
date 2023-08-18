import {Component} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user-service.service";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent  {
  placeholder:User= new User("firstName","lastName","email","mobileNumber",[],[])
  register:string="register"
  onSave(newUser:User) {
    this.userService.saveUser(newUser).subscribe();
  }

  constructor(private userService: UserService) {}

}
