import { useEffect } from 'react';
import useBoundStore from '~/store/useStore';

export const useSharedResources = (resourceId?: string) => {
  const { sharedResources, getSharedResources, getSharedSubResources } = useBoundStore();

  useEffect(() => {
    if (!resourceId) {
      getSharedResources();
    } else {
      getSharedSubResources(+resourceId);
    }
  }, [getSharedResources, getSharedSubResources, resourceId]);

  return {
    sharedResources,
  };
};
