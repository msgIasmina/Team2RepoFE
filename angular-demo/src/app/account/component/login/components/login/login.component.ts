import { Component, OnInit } from "@angular/core"
import { FormBuilder, Validators} from "@angular/forms";
import {LoginRequest} from "../../models/login-request";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isHelpFieldOpen: boolean = false;
  showPassword: boolean = false;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private loginService: AccountService, private router:Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    const username=this.loginForm.get('username')?.value;
    const password=this.loginForm.get('password')?.value;
    const loginRequest:LoginRequest = new LoginRequest(username,password);
    this.loginService.login(loginRequest).subscribe(
      response => {
          if(response.newUser){
            this.router.navigate(['/firstLogin']);
          }
          else{
            if(response.disabled){
              window.alert("Your account has been deactivated")
            }else {
              this.router.navigate(['/management/home']);
            }
          }
      },
      err => {
        window.alert(err.message)
      }
    );
  }

  toggleHelpField() {
    this.isHelpFieldOpen = !this.isHelpFieldOpen;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}
