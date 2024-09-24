import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import useBoundStore from '../../store/useStore';
import { PermissionType } from '../../types/resource';
import { postPermissions } from '../../services/permissions';
import { schema } from './schema';

type FormValues = {
  permissions: {
    email: string;
    type: PermissionType;
  }[];
};

interface Props {
  resourceId: number;
  name: string;
}
export const PermissionsForm: React.FC<Props> = ({ resourceId, name }) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 p-5 rounded-lg w-[90vw] max-w-[550px]">
      <h3 className="text-semibold">{name}</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="border-2 border-gray-300 p-4 flex items-center gap-4 rounded-lg shadow-sm">
          <Controller
            name={`permissions.${index}.email`}
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
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
              <select
                {...field}
                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="read">Read</option>
                <option value="update">Update</option>
              </select>
            )}
          />
          <button type="button" onClick={() => remove(index)} className="rounded-md p-2 bg-gray-300 hover:bg-gray-500">
            Remove
          </button>
        </div>
      ))}

      {fields.length !== users.length && (
        <button
          type="button"
          onClick={() => append({ email: '', type: PermissionType.READ })}
          className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400 self-end"
        >
          Add Permission
        </button>
      )}

      <button type="submit" className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400 self-end">
        Submit
      </button>
    </form>
  );
};
