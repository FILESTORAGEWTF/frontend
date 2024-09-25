import { FC } from 'react';
import { FaPen } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import { IoMdDownload } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useModal } from '~/hooks';
import { downloadFile } from '~/services/file';
import { PermissionType, ResourceType } from '~/types';
import { FileItem } from './components';

interface Props {
  id: number;
  name: string;
  permissionType?: PermissionType;
  shareable: boolean;
  type: ResourceType;
  isDashboard: boolean;
  folderId: string | null;
  storedFileName: string | null;
}

export const ResourceItem: FC<Props> = ({
  id,
  name,
  permissionType,
  shareable,
  type,
  isDashboard,
  folderId,
  storedFileName,
}) => {
  const navigate = useNavigate();

  const { openUpdateModal, openDeleteModal, openPermissionModal } = useModal();

  const checkUpdatable = (permissionType?: PermissionType) =>
    permissionType ? permissionType === PermissionType.UPDATE : false;

  const handleFolderChange = (resourceId: number) => {
    if (isDashboard) {
      navigate(`/dashboard/${resourceId}`, { replace: false });
    } else {
      navigate(`/shared/${resourceId}`, { replace: false });
    }
  };

  const onDownloadFile = (id: number) => {
    downloadFile(id);
  };
  return (
    <div className="" key={id}>
      <div className="flex gap-2 justify-end">
        {(isDashboard || checkUpdatable(permissionType)) && (
          <button
            className="rounded p-1 bg-gray-300 hover:bg-gray-400"
            onClick={() => openUpdateModal({ id, parentId: folderId, name, shareable, isShared: !isDashboard })}
          >
            <FaPen />
          </button>
        )}
        {isDashboard && (
          <button className="rounded p-1 bg-gray-300 hover:bg-gray-400" onClick={() => openDeleteModal(id, name)}>
            <RiDeleteBin6Line />
          </button>
        )}
        {isDashboard && shareable && (
          <button className="rounded p-1 bg-gray-300 hover:bg-gray-400" onClick={() => openPermissionModal(id, name)}>
            <FiShare2 />
          </button>
        )}
        {type === ResourceType.FILE && (
          <button className="rounded p-1 bg-gray-300 hover:bg-gray-400" onClick={() => onDownloadFile(id)}>
            <IoMdDownload />
          </button>
        )}
      </div>

      <div className="border-1 flex flex-col items-center gap-2 w-28">
        {type === ResourceType.FOLDER ? (
          <div className="h-28 w-28 mt-3 bg-slate-400" onClick={() => handleFolderChange(id)}></div>
        ) : (
          <FileItem name={name} storedFileName={storedFileName} />
        )}

        <span className="w-full px-2 whitespace-pre-wrap truncate" title={name}>
          {name}
        </span>
      </div>
    </div>
  );
};
