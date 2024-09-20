import { StateCreator } from 'zustand';
import { fetchResources } from '../shared/services/fetchResources';
import { Resource } from '../shared/types';

export interface ResourcesSlice {
  resources: Resource[] | null;

  getCategories: () => Promise<void>;
}

const createResourcesSlice: StateCreator<ResourcesSlice> = (set) => ({
  resources: null,

  getCategories: async () => {
    const response = await fetchResources();
    set({ resources: response });
  },
});

export default createResourcesSlice;
