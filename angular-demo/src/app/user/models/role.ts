import {ERole} from "./ERole";
import {Permission} from "./permission";

export class Role {
  constructor(
              public name: ERole,
              public permissions: Permission[],
              public id?: number) {
  }
}
