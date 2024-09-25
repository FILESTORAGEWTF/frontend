import { FC } from 'react';
import { Resource } from '~/types';
import { ResourceItem } from './components';

interface Props {
  resources: Resource[];
  folderId?: null | string;
  isDashboard: boolean;
}
export const Resources: FC<Props> = ({ resources, isDashboard, folderId = null }) => {
  return (
    <div className="flex gap-4 flex-wrap p-2">
      {resources.map(({ id, name, permissionType, shareable, type, storedFilename }) => (
        <ResourceItem
          key={id}
          name={name}
          id={id}
          folderId={folderId}
          type={type}
          permissionType={permissionType}
          shareable={shareable}
          isDashboard={isDashboard}
          storedFileName={storedFilename}
        />
      ))}
    </div>
  );
};
