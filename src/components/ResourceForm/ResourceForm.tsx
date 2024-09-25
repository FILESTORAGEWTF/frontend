import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useBoundStore from '~/store/useStore';
import { ResourceType } from '~/types';
import { schema } from './schema';

interface FormValues {
  name: string;
  shareable: boolean;
}

interface Props {
  resourceId?: number;
  parentId?: string | null;
  initialValues?: FormValues;
  isShared?: boolean;
}

export const ResourceForm: FC<Props> = ({ resourceId, parentId = null, initialValues, isShared }) => {
  const { updateResource, createFolder, closeModal, updateSharedResource } = useBoundStore();

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

  console.log('onUpdate', isShared);

  const onUpdate = isShared ? updateSharedResource : updateResource;

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
        return onUpdate({ name, shareable }, resourceId);
      } else {
        console.log(parentId);
        return createFolder({ name, shareable, parentId, type: ResourceType.FOLDER });
      }
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
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
          <input
            {...register('shareable')}
            type="checkbox"
            id="shareable"
            name="shareable"
            className="mr-2 bg-white border-none opacity-50 checked:opacity-100 border-2"
          />
          Sharable
        </label>
      </div>

      <button type="submit" className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400 self-end">
        Submit
      </button>
    </form>
  );
};
