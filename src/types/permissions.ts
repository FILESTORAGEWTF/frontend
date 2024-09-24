import { PermissionType } from './resource';

export interface Permission {
  userId: string;
  userEmail: string;
  type: PermissionType;
}
