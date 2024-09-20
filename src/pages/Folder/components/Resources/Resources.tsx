import { FC } from 'react';
import { Resource } from '../../../../shared/types';
import { Link } from 'react-router-dom';

interface Props {
  resources: Resource[];
}
export const Resources: FC<Props> = ({ resources }) => {
  return (
    <div className="flex gap-4 flex-wrap p-2">
      {resources.map(({ id, name, type }) => {
        return (
          <Link key={id} to={type === 'folder' ? `/folder/${id}` : `/file/${id}`}>
            <div className="border-1 flex flex-col items-center gap-3 w-24">
              <div className="h-20 w-20 bg-slate-400"></div>
              <span className="w-2/3 truncate" title={name}>
                {name}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};