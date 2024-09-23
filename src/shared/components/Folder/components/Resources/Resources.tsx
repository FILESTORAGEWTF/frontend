import { FC } from 'react';
import { ModalEnum, Resource } from '../../../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import useBoundStore from '../../../../../store/useStore';

interface Props {
  resources: Resource[];
  openUpdateForm: (name: string, shareable: boolean, resourceId: number) => void;
}
export const Resources: FC<Props> = ({ resources, openUpdateForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { openModal } = useBoundStore();

  const handleFolderChange = (resourceId: number) => {
    if (currentPath.includes('/dashboard')) {
      navigate(`/dashboard/${resourceId}`, { replace: false });
    } else {
      navigate(`/shared/${resourceId}`, { replace: false });
    }
  };

  return (
    <div className="flex gap-4 flex-wrap p-2">
      {resources.map(({ id, name, type }) => {
        return (
          <div className="" key={id}>
            <div className="mb-5">
              <button onClick={() => openModal(ModalEnum.CREATE_FOLDER)}>update</button>
            </div>

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
