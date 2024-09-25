import { FC } from 'react';

interface Props {
  name: string;
  storedFileName: null | string;
}

const supportedImageTypes = ['jpeg', 'png', 'gif', 'webp', 'svg'];

export const FileItem: FC<Props> = ({ name, storedFileName }) => {
  const type = storedFileName?.split('.').pop() || 'unknown';

  const isImage = supportedImageTypes.includes(type);
  return (
    <div className="h-28 w-28 mx-auto mt-3 bg-white shadow-md border border-gray-200">
      {isImage ? (
        <img src={`${import.meta.env.VITE_STATIC_FILE_STORE}/${storedFileName}`} alt={name} />
      ) : (
        <div className=" p-4 truncate">{type}</div>
      )}
    </div>
  );
};
