import { useEffect, useMemo } from 'react';
import useBoundStore from '../../store/useStore';

export const useResources = (resourceId?: string) => {
  const { getCategories, resources } = useBoundStore();
  console.log(resourceId);

  useEffect(() => {
    if (!resources) {
      getCategories();
    }
  }, [resources, getCategories]);

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
