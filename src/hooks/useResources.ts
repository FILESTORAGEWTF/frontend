import { useEffect, useMemo } from 'react';
import useBoundStore from '../store/useStore';

export const useResources = (parentId?: string) => {
  const { getResources, resources } = useBoundStore();

  useEffect(() => {
    if (!resources.length) {
      getResources();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredResources = useMemo(() => {
    if (!resources.length) return resources;

    return resources.filter((resource) => {
      if (parentId) {
        return Number(resource.parentId) === Number(parentId);
      }
      return !resource.parentId;
    });
  }, [parentId, resources]);

  return {
    resources: filteredResources,
  };
};
