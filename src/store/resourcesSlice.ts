import { StateCreator } from 'zustand';
import { deleteResource, fetchResources, postFolder } from '../shared/services/fetchResources';
import { Resource } from '../shared/types';
import { CreateResourceData, UpdateResourceData } from '../shared/types/resource';

export interface ResourcesSlice {
  resources: Resource[];
  getResources: () => Promise<void>;
  createFolder: (data: CreateResourceData) => Promise<void>;
  updateResource: (data: UpdateResourceData) => Promise<void>;
  addFileData: (data: Resource) => void;
  deleteResource: (id: number) => Promise<void>;
}

const createResourcesSlice: StateCreator<ResourcesSlice> = (set, get) => ({
  resources: [],
  getResources: async () => {
    const response = await fetchResources();
    set({ resources: response });
  },

  createFolder: async (data) => {
    const response = await postFolder(data);
    set((state) => ({
      resources: [...state.resources, response],
    }));
  },

  updateResource: async (data) => {
    await postFolder(data);
    const { id, ...updateResourceData } = data;
    set((state) => ({
      resources: state.resources.map((resource) => {
        if (resource.id === id) {
          return { ...resource, ...updateResourceData };
        }
        return resource;
      }),
    }));
  },

  addFileData: (data) => {
    set((state) => ({
      resources: [...state.resources, data],
    }));
  },

  deleteResource: async (id) => {
    await deleteResource(id);
    const { resources } = get();
    const newOrderList: Resource[] = resources.filter((resource) => resource.id !== id);
    set({ resources: newOrderList });
  },
});

export default createResourcesSlice;
