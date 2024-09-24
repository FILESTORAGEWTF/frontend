import { FC } from 'react';
import useBoundStore from '../../../../store/useStore';

interface Props {
  resourceId: number;
}
export const ConfirmDelete: FC<Props> = ({ resourceId }) => {
  const { deleteResource, closeModal } = useBoundStore();

  return (
    <div className="flex flex-col gap-10">
      <h6>Are you sure you want to delete the resource</h6>
      <div className="flex gap-4 self-end">
        <button onClick={closeModal} className="px-2 rounded-md border">
          cancel
        </button>
        <button onClick={() => deleteResource(resourceId)} className="px-2 rounded-md border">
          delete
        </button>
      </div>
    </div>
  );
};
