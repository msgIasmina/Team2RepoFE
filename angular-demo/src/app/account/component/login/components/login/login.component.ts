import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../models/login-request";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import * as bcrypt from 'bcryptjs';
import { MD5 } from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private loginService: AccountService, private router:Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onLogin() {
    const username=this.loginForm.get('username')?.value;
    const password = MD5(this.loginForm.get('password')?.value).toString();
    const loginRequest:LoginRequest = new LoginRequest(username,password);
    this.loginService.login(loginRequest).subscribe(
      response => {
          if(response.newUser){
            this.router.navigate(['/firstLogin']);
          }
          else{
            if(response.disabled){
              this.toastr.success("Your account has been deactivated");
            }else {
              this.router.navigate(['/management/home']);
            }
          }
      },
      err => {
        this.toastr.error(err.message);
      }
    );
  }

}
