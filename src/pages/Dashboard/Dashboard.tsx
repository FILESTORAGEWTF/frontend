import { useParams } from 'react-router-dom';
import { Folder } from '~/components';
import { useResources } from '~/hooks';

export const Dashboard = () => {
  const { folderId } = useParams();
  const { resources } = useResources(folderId);
  return <Folder resources={resources} />;
};
