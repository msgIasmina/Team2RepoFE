import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { RoleListComponent } from '../permission/components/role-list/role-list.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddCampignREPComponent } from './components/add-campign-rep/add-campign-rep.component';
import { PermissionManagemntGuard } from '../account/component/utils/permission-managemnt-guard';

const routes: Routes = [
  {
    path: 'permissions',
    component: RoleListComponent,
    canActivate: [PermissionManagemntGuard],
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent,
  },
  { path: 'list', component: UserListComponent },
  { path: 'details', component: UserDetailsComponent },
  {
    path: 'register',
    component: UserRegisterComponent,
  },
  {
    path: 'campaigns',
    component: AddCampignREPComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
