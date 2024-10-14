import { FC } from 'react';
import useBoundStore from '~/store/useStore';

export const Filter: FC = () => {
  const { filter, setFilter } = useBoundStore();

  return (
    <div>
      <h3 className="text-start">filer</h3>
      <input
        className="border border-gray-500"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};
