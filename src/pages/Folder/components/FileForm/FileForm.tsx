import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { uploadFile } from '../../../../shared/services/uploadFile';

interface Props {
  folderId?: string;
}
export const FileForm: FC<Props> = ({ folderId }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const submitFile = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      console.log('folder id', folderId);
      formData.append('parentId', folderId);
      console.log('formData ==> ', formData.get('parentId'));
    }

    try {
      const response = await uploadFile(formData);
      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={submitFile} className="rounded-2xl border-4 flex-col items-center px-5">
      <h6>upload a new file</h6>
      <input className="mt-5 w-2/3" type="file" onChange={handleFileChange} />
      <button type="submit" className="border-2 mt-5 rounded-xl px-3">
        Upload
      </button>
    </form>
  );
};
