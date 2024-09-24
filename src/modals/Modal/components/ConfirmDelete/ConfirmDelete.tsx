import { FC } from 'react';
import useBoundStore from '../../../../store/useStore';

interface Props {
  resourceId: number;
  name: string;
}
export const ConfirmDelete: FC<Props> = ({ resourceId, name }) => {
  const { deleteResource, closeModal } = useBoundStore();

  return (
    <div className="flex flex-col gap-10 p-5 max-w-[600px]">
      <h6 className="ext-lg font-semibold">{`Are you sure you want to delete the ${name} resource, ll resources inside will also be deleted`}</h6>
      <div className="flex gap-4 self-end">
        <button onClick={closeModal} className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400">
          cancel
        </button>
        <button
          onClick={() => deleteResource(resourceId)}
          className="border-2 mt-5 rounded-md p-2 bg-gray-300 hover:bg-gray-400"
        >
          delete
        </button>
      </div>
    </div>
  );
};
