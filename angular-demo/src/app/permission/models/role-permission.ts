import {ERole} from "../../user/models/ERole";
import {Permission} from "../../user/models/permission";

export class RolePermission {
  constructor(
    public role: ERole,
    public acquiredPermissions: Permission[],
    public missingPermissions: Permission[]
  ) {

  }

}
