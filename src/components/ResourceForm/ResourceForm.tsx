import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useBoundStore from '../../store/useStore';
import { ResourceType } from '../../types/resource';

interface FormValues {
  name: string;
  shareable: boolean;
}

interface Props {
  resourceId?: number;
  parentId?: string | null;
  initialValues?: FormValues;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  shareable: yup.boolean().required(),
});

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 border rounded-xl p-5 items-start outline  h-min"
    >
      <div className="flex flex-col items-start gap-3 w-full">
        <label htmlFor="name">Name:</label>
        <input {...register('name')} type="text" id="name" name="name" className="outline rounded w-full bg-white" />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="flex flex-col items-start gap-3">
        <label htmlFor="sharable">Sharable:</label>
        <input {...register('shareable')} type="checkbox" id="shareable" name="shareable" />
      </div>
      <button type="submit" className="self-center border-2  rounded-md py-1 px-3">
        Submit
      </button>
    </form>
  );
};
