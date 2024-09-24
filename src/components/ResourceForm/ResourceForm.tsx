import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useBoundStore from '../../store/useStore';
import { ResourceType } from '../../types/resource';
import { schema } from './schema';

interface FormValues {
  name: string;
  shareable: boolean;
}

interface Props {
  resourceId?: number;
  parentId?: string | null;
  initialValues?: FormValues;
}

export const ResourceForm: FC<Props> = ({ resourceId, parentId = null, initialValues }) => {
  const { updateResource, createFolder } = useBoundStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      shareable: false,
    },
  });

  useEffect(() => {
    if (initialValues) {
      setValue('name', initialValues.name);
      setValue('shareable', initialValues.shareable);
    }
  }, [initialValues, setValue]);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { name, shareable } = data;
    try {
      if (initialValues && resourceId) {
        return updateResource({ name, shareable }, resourceId);
      } else {
        console.log(parentId);
        return createFolder({ name, shareable, parentId, type: ResourceType.FOLDER });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 rounded-xl p-6 w-[90vw] max-w-[500px]">
      <div className="flex flex-col items-start gap-3">
        <label htmlFor="name" className="text-lg font-semibold">
          Name:
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          name="name"
          className="outline rounded-md w-full p-2 border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col items-start gap-3">
        <label htmlFor="shareable" className="flex items-center text-lg font-semibold">
          <input {...register('shareable')} type="checkbox" id="shareable" name="shareable" className="mr-2" />
          Sharable
        </label>
      </div>

      <button type="submit" className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400 self-end">
        Submit
      </button>
    </form>
  );
};
