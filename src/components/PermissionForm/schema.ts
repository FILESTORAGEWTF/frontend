import * as yup from 'yup';
import { PermissionType } from '~/types';

export const schema = yup.object().shape({
  permissions: yup
    .array()
    .of(
      yup.object().shape({
        email: yup.string().required('User Email is required'),
        type: yup.string().oneOf(Object.values(PermissionType)).required('Permission type is required'),
      })
    )
    .min(1, 'At least one permission is required')
    .required(),
});
