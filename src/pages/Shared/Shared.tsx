import { FC } from 'react';
import { Folder } from '~/components';
import { useSharedResources } from '~/hooks';
import { useParams } from 'react-router-dom';

export const Shared: FC = () => {
  const { folderId } = useParams();
  const { filteredSharedResources } = useSharedResources(folderId);
  return <Folder resources={filteredSharedResources} />;
};
