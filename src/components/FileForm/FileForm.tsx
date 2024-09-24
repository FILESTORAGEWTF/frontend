import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { uploadFile } from '~/services/file';
import useBoundStore from '~/store/useStore';

interface Props {
  folderId?: string;
}
export const FileForm: FC<Props> = ({ folderId }) => {
  const [file, setFile] = useState<File | null>(null);
  const [shareable, setShareable] = useState(false);

  const { addFileData } = useBoundStore();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setShareable(checked);
  };

  const submitFile = async (event: FormEvent) => {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'meta',
      JSON.stringify({
        parentId: folderId || null,
        shareable: false,
      })
    );

    try {
      const response = await uploadFile(formData);
      addFileData(response);
      console.log('File uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={submitFile} className="rounded-2xl flex-col items-center">
      <h4 className="text-center text-lg font-semibold">Upload a new file </h4>
      <div className="flex flex-col items-start p-4 rounded-lg">
        <label htmlFor="shareable" className="flex items-center mb-3 text-lg">
          <input
            type="checkbox"
            name="shareable"
            id="shareable"
            checked={shareable}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <span>Shareable</span>
        </label>

        <div className="mt-5 w-full">
          <label htmlFor="file-upload" className="block text-lg mb-1">
            Upload File:
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 bg-gray-300 hover:bg-gray-400"
            type="file"
            id="file-upload"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400 self-end">
          Upload
        </button>
      </div>
    </form>
  );
};
