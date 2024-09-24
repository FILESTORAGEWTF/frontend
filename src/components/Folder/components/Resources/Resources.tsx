import { FC } from 'react';
import { ModalEnum, Resource } from '../../../../types';
import useBoundStore from '../../../../store/useStore';
import { PermissionType } from '../../../../types/resource';
import { useNavigate } from 'react-router-dom';

interface Props {
  resources: Resource[];
  folderId?: null | string;
  isDashboard: boolean;
}
export const Resources: FC<Props> = ({ resources, isDashboard, folderId = null }) => {
  const navigate = useNavigate();

  const { openModal } = useBoundStore();

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
            <div className="border-2 flex gap-2">
              {(isDashboard || checkUpdatable(permissionType)) && (
                <button
                  className="border-2 rounded-lg"
                  onClick={() =>
                    openModal({
                      modalType: ModalEnum.UPDATE_RESOURCE,
                      data: {
                        resourceId: id,
                        parentId: folderId,
                        initialValues: {
                          shareable,
                          name,
                        },
                      },
                    })
                  }
                >
                  update
                </button>
              )}
              {isDashboard && (
                <button
                  className="border-2 rounded-lg"
                  onClick={() => openModal({ modalType: ModalEnum.CONFIRM_DELETE, data: { resourceId: id } })}
                >
                  delete
                </button>
              )}
            </div>

            {isDashboard && shareable && (
              <button
                className="border-2 rounded-lg"
                onClick={() => openModal({ modalType: ModalEnum.CREATE_PERMISSION, data: { resourceId: id } })}
              >
                share
              </button>
            )}

            <div className="mb-5"></div>

            <div className="border-1 flex flex-col items-center gap-3 w-24" onClick={() => handleFolderChange(id)}>
              <div className="h-20 w-20 bg-slate-400"></div>
              <span className="w-2/3 truncate" title={name}>
                {name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
