import { FC, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Resources } from './components';
import { ModalEnum, Resource } from '~/types';
import useBoundStore from '~/store/useStore';

interface Props {
  resources: Resource[];
}
export const Folder: FC<Props> = ({ resources }) => {
  const { folderId } = useParams();

  const location = useLocation();
  const currentPath = location.pathname;
  const isDashboard = useMemo(() => currentPath.includes('/dashboard'), [currentPath]);

  const { openModal } = useBoundStore();

  const openCreateFolderModal = () =>
    openModal({
      modalType: ModalEnum.CREATE_FOLDER,
      data: {
        folderId,
      },
    });

  const openUploadFileModal = () =>
    openModal({
      modalType: ModalEnum.UPLOAD_FILE,
      data: {
        folderId,
      },
    });

  return (
    <div className="flex flex-col gap-10 px-5">
      <div className="flex justify-between items-center">
        <h6 className="px-3">Folder {folderId}</h6>
        {isDashboard && (
          <div className="flex gap-3 p-4">
            <button className="border rounded py-1 px-3 bg-gray-300 hover:bg-gray-400" onClick={openUploadFileModal}>
              upload file
            </button>
            <button className="border rounded py-1 px-3 bg-gray-300 hover:bg-gray-400" onClick={openCreateFolderModal}>
              new folder
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {resources && <Resources isDashboard={isDashboard} resources={resources} folderId={folderId} />}
      </div>
    </div>
  );
};
