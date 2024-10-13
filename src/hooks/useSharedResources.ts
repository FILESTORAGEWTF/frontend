import { useEffect, useMemo } from 'react';
import useBoundStore from '~/store/useStore';

export const useSharedResources = (resourceId?: string) => {
  const { sharedResources, getSharedResources } = useBoundStore();

  useEffect(() => {
    getSharedResources();
  }, [getSharedResources]);

  const filteredSharedResources = useMemo(() => {
    return sharedResources.filter((resource) => {
      if (resourceId) {
        return Number(resource.parentId) === Number(resourceId);
      }
      return !resource.parentId;
    });
  }, [resourceId, sharedResources]);

  return {
    filteredSharedResources,
  };
};
