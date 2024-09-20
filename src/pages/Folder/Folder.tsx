import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResources } from '../../shared/hooks/useResources';
import { FileForm } from './components';
import { Resources } from './components/Resources';

export const Folder: FC = () => {
  const { folderId } = useParams();
  const { resources } = useResources(folderId);
  const [isFormOpen, setFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <h6>Folder {folderId}</h6>
      </div>
      <button onClick={() => setFormOpen((prev) => !prev)}>toggle form</button>
      <div className="flex justify-between">
        {resources && <Resources resources={resources} />}
        {isFormOpen && <FileForm />}
      </div>
    </div>
  );
};
