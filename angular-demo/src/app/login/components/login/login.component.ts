import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../models/login-request";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

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

  constructor(private fb: FormBuilder, private loginService: LoginService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const username=this.loginForm.get('username')?.value;
    const password=this.loginForm.get('password')?.value;
    const loginRequest:LoginRequest = new LoginRequest(username,password);
    this.loginService.login(loginRequest).subscribe(
      response => {
        if(response.token === ''){
          window.alert("can't log in")
        }else{
          if(response.newUser){
            window.alert("new user");
          }
        }
      },
      err => window.alert(err.message)
    );
  }
}
