import { useEffect, useMemo } from 'react';
import useBoundStore from '../../store/useStore';

export const useResources = (resourceId?: string) => {
  const { getResources, resources } = useBoundStore();

  useEffect(() => {
    if (!resources.length) {
      getResources();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredResources = useMemo(() => {
    if (!resources) return resources;

    return resources.filter(({ parentId }) => {
      if (resourceId) {
        return parentId === Number(resourceId);
      }
      return !parentId;
    });
  }, [resourceId, resources]);

  return {
    resources: filteredResources,
  };
};
