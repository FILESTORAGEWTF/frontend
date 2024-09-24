import { FC } from 'react';
import { Resource } from '~/types';
import { PermissionType } from '~/types';
import { useNavigate } from 'react-router-dom';
import { FiShare2 } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from '~/hooks';

interface Props {
  resources: Resource[];
  folderId?: null | string;
  isDashboard: boolean;
}
export const Resources: FC<Props> = ({ resources, isDashboard, folderId = null }) => {
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

  return (
    <div className="flex gap-4 flex-wrap p-2">
      {resources.map(({ id, name, permissionType, shareable }) => {
        return (
          <div className="" key={id}>
            <div className="flex gap-2 justify-end">
              {(isDashboard || checkUpdatable(permissionType)) && (
                <button
                  className="rounded p-1 bg-gray-300 hover:bg-gray-400"
                  onClick={() => openUpdateModal({ id, parentId: folderId, name, shareable })}
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
                <button
                  className="rounded p-1 bg-gray-300 hover:bg-gray-400"
                  onClick={() => openPermissionModal(id, name)}
                >
                  <FiShare2 />
                </button>
              )}
            </div>

            <div className="border-1 flex flex-col items-center gap-2 w-28" onClick={() => handleFolderChange(id)}>
              <div className="h-28 w-28 mt-3 bg-slate-400"></div>
              <span className="w-full px-2 whitespace-pre-wrap truncate" title={name}>
                {name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
