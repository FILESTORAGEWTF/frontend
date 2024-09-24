import { useEffect } from 'react';
import useBoundStore from '../store/useStore';

export const useSharedResources = (resourceId?: string) => {
  const { sharedResources, getSharedResources, getSharedSubResources } = useBoundStore();

  console.log(sharedResources);
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
