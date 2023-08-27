import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service.service';
import { resolveFileWithPostfixes } from '@angular/compiler-cli/ngcc/src/utils';
import { ToastrService } from 'ngx-toastr';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  placeholder: User = new User(
    'First Name',
    'Last Name',
    'Email',
    'Mobile Number',
    [],
  );
  register: string = 'register';

  onSave(newUser: User) {
    this.userService.saveUser(newUser).subscribe(
      (response) => {
        this.toastr.success(response.text);
        this.router.navigate(['/management/users/list']);
      },
      (error) => this.toastr.error(error.error),
    );
  }

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) {}
}
