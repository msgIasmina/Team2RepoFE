import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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


  constructor(private fb: FormBuilder,
              private loginService: LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  checkIfFirst(str:string|null):boolean{
    return str === "true";
  }

  onLogin() {

    const username=this.loginForm.get('username')?.value;
    const password=this.loginForm.get('password')?.value;
    console.log(username);
    console.log(password);

    const loginRequest = new LoginRequest(username,password);

    this.loginService.login(loginRequest);

    //let bool =localStorage.getItem("firstLogin")
    let bool="true";


    try {
      if (this.checkIfFirst(bool)) {
        this.router.navigate(['/firstLogin']);
      } else {
        this.router.navigate(['/homepage']);
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    }

    localStorage.setItem('role',"admin")
  }

}
