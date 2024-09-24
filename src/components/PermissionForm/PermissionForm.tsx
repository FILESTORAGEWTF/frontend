import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useBoundStore from '../../store/useStore';
import { PermissionType } from '../../types/resource';
import { postPermissions } from '../../services/permissions';

type FormValues = {
  permissions: {
    email: string;
    type: PermissionType;
  }[];
};

const schema = yup.object().shape({
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

interface Props {
  resourceId: number;
}
export const PermissionsForm: React.FC<Props> = ({ resourceId }) => {
  const { users, setUsers } = useBoundStore();

  const usersMap = useMemo(() => new Map(users.map((user) => [user.email, user.id])), [users]);

  useEffect(() => {
    if (!users.length) {
      setUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      permissions: [{ email: '', type: PermissionType.READ }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permissions',
  });

  const onSubmit = (data: FormValues) => {
    const permissionsToSubmit = {
      resourceId,
      permissions: data.permissions.map(({ email, type }) => ({
        type,
        userEmail: email,
        userId: usersMap.get(email) as string,
      })),
    };

    postPermissions(permissionsToSubmit);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {fields.map((field, index) => (
        <div key={field.id} className="border-2 p-2 flex gap-2">
          <Controller
            name={`permissions.${index}.email`}
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select User</option>
                {users.map((user) => {
                  if (fields.find((field) => field.email === user.email)) {
                    return null;
                  }
                  return (
                    <option key={user.id} value={user.email}>
                      {user.email}
                    </option>
                  );
                })}
              </select>
            )}
          />
          <Controller
            name={`permissions.${index}.type`}
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="read">Read</option>
                <option value="update">Update</option>
              </select>
            )}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      {fields.length !== users.length && (
        <button type="button" onClick={() => append({ email: '', type: PermissionType.READ })}>
          Add Permission
        </button>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};
