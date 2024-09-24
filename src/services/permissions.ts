import { Permission } from '~/types';
import { APIService } from './api-client';

interface PostPermissionsFormData {
  permissions: Permission[];
  resourceId: number;
}
export const postPermissions = async (data: PostPermissionsFormData) => {
  return await APIService.post('/permission', data);
};
