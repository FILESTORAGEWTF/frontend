import { useParams } from 'react-router-dom';
import { Folder } from '../../components/Folder';
import { useResources } from '../../hooks/useResources';

export const Dashboard = () => {
  const { folderId } = useParams();
  const { resources } = useResources(folderId);
  return <Folder resources={resources} />;
};
