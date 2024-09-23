import { FC } from 'react';
import { Folder } from '../../shared/components/Folder';
import { useSharedResources } from '../../shared/hooks/useSharedResources';
import { useParams } from 'react-router-dom';

export const Shared: FC = () => {
  const { folderId } = useParams();
  const { sharedResources } = useSharedResources(folderId);
  console.log('sharedResources ====> ', sharedResources);
  return <Folder resources={sharedResources} />;
};
