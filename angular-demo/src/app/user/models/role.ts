import {ERole} from "./ERole";
import {Permission} from "./permission";

export class Role {
  constructor(public id: number,
              public name: ERole,
              public permissions: Permission[]) {
  }
}
