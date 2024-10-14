import { useEffect, useMemo } from 'react';
import useBoundStore from '~/store/useStore';

export const useResources = (parentId?: string) => {
  const { getResources, resources, filter, setFilter } = useBoundStore();

  useEffect(() => {
    getResources();
    return () => {
      setFilter('');
    };
  }, [getResources, setFilter]);

  const filteredResources = useMemo(() => {
    if (!resources.length) return resources;

    return resources.filter((resource) => {
      if (filter) {
        return resource.name.includes(filter);
      }
      if (parentId) {
        return Number(resource.parentId) === Number(parentId);
      }
      return !resource.parentId;
    });
  }, [parentId, resources, filter]);

  return {
    resources: filteredResources,
  };
};
