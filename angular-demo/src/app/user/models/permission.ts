import { EPermission } from './EPermission';

export class Permission {
  constructor(
    public permission: EPermission,
    public id?: number,
  ) {}
}
