import { useEffect, useMemo } from 'react';
import useBoundStore from '~/store/useStore';

export const useSharedResources = (resourceId?: string) => {
  const { sharedResources, getSharedResources, filter, setFilter } = useBoundStore();

  useEffect(() => {
    getSharedResources();

    return () => {
      setFilter('');
    };
  }, [getSharedResources, setFilter]);

  const filteredSharedResources = useMemo(() => {
    return sharedResources.filter((resource) => {
      if (filter) {
        return resource.name.includes(filter);
      }
      if (resourceId) {
        return Number(resource.parentId) === Number(resourceId);
      }
      return !resource.parentId;
    });
  }, [filter, resourceId, sharedResources]);

  return {
    filteredSharedResources,
  };
};
