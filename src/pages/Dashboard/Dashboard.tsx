import { useParams } from 'react-router-dom';
import { Folder } from '../../shared/components/Folder';
import { useResources } from '../../shared/hooks/useResources';

export const Dashboard = () => {
  const { folderId } = useParams();
  const { resources } = useResources(folderId);
  return <Folder resources={resources} />;
};
