import { FC, useEffect, useState } from 'react';

interface FormValues {
  name: string;
  shareable: boolean;
}

interface Props {
  folderId?: string;
  initialValues?: FormValues & { resourceId: number };
}

export const ResourceForm: FC<Props> = ({ initialValues, folderId }) => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    shareable: false,
  });

  useEffect(() => {
    if (initialValues) {
      const { name, shareable } = initialValues;
      setFormValues({ name, shareable });
    }
  }, [initialValues]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formValues, initialValues?.resourceId, folderId);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border rounded-xl p-5 items-start outline w-1/2 h-min">
      <div className="flex flex-col items-start gap-3 w-full">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formValues.name}
          onChange={handleInputChange}
          className="outline rounded w-full"
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <label htmlFor="sharable">Sharable:</label>
        <input
          type="checkbox"
          id="sharable"
          name="sharable"
          checked={formValues.shareable}
          onChange={handleCheckboxChange}
        />
      </div>
      <button type="submit" className="self-center border-2  rounded-md py-1 px-3">
        Submit
      </button>
    </form>
  );
};
