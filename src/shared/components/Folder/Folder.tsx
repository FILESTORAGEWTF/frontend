import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FileForm } from './components';
import { Resources } from './components/Resources';
import { ResourceForm } from '..';
import { Resource } from '../../types';

interface UpdateFormState {
  name: string;
  shareable: boolean;
  resourceId: number;
}
interface Props {
  resources: Resource[];
}
export const Folder: FC<Props> = ({ resources }) => {
  const { folderId } = useParams();
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [updateFormState, setUpdateFormOpen] = useState<null | UpdateFormState>(null);

  const onOpenUpdateForm = useCallback((name: string, shareable: boolean, resourceId: number) => {
    setUpdateFormOpen({ name, shareable, resourceId });
  }, []);

  console.log('im in folder ', resources)
  return (
    <div className="flex flex-col gap-10 px-5">
      <div className="flex justify-between items-center">
        <h6 className="px-3">Folder {folderId}</h6>
        <div className="flex gap-3 p-4">
          <button className="border rounded py-1 px-3" onClick={() => setFormOpen((prev) => !prev)}>
            toggle form
          </button>
          <button className="border rounded py-1 px-3" onClick={() => setCreateFormOpen((prev) => !prev)}>
            new folder
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        {resources && <Resources resources={resources} openUpdateForm={onOpenUpdateForm} />}
        {isFormOpen && <FileForm folderId={folderId} />}
        {isCreateFormOpen && <ResourceForm parentId={folderId} />}
        {updateFormState && <ResourceForm initialValues={updateFormState} parentId={folderId} />}
      </div>
    </div>
  );
};
