import { Injectable } from '@angular/core';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class SelectedRolesService {
  selectedRoles: Role[] = [];

  constructor() {}
}
