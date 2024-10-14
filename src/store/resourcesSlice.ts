import { StateCreator } from 'zustand';
import {
  deleteResource,
  fetchResources,
  fetchSharedResources,
  fetchSharedResourcesByParentId,
  patchResource,
  postFolder,
} from '~/services/resource';
import { Resource } from '~/types';
import { CreateResourceData, UpdateResourceData } from '~/types';

export interface ResourcesSlice {
  resources: Resource[];
  sharedResources: Resource[];
  getResources: () => Promise<void>;
  createFolder: (data: CreateResourceData) => Promise<void>;
  updateResource: (data: UpdateResourceData, id: number) => Promise<void>;
  addFileData: (data: Resource) => void;
  deleteResource: (id: number) => Promise<void>;

  getSharedResources: () => Promise<void>;
  updateSharedResource: (data: UpdateResourceData, id: number) => Promise<void>;
  getSharedSubResources: (parentId: number) => Promise<void>;

  filter: string;
  setFilter: (value: string) => void;
}

const createResourcesSlice: StateCreator<ResourcesSlice> = (set, get) => ({
  filter: '',
  resources: [],
  sharedResources: [],

  setFilter: (value: string) => set({ filter: value }),
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

  updateResource: async (data, id) => {
    await patchResource(data, id);
    set((state) => ({
      resources: state.resources.map((resource) => {
        if (resource.id === id) {
          return { ...resource, ...data };
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
    const newResources: Resource[] = resources.filter((resource) => resource.id !== id);
    set({ resources: newResources });
  },

  getSharedResources: async () => {
    const response = await fetchSharedResources();
    set({ sharedResources: response });
  },

  updateSharedResource: async (data, id) => {
    await patchResource(data, id);
    set((state) => ({
      sharedResources: state.sharedResources.map((resource) => {
        if (resource.id === id) {
          return { ...resource, ...data };
        }
        return resource;
      }),
    }));
  },

  getSharedSubResources: async (parentId) => {
    const response = await fetchSharedResourcesByParentId(parentId);
    set({ sharedResources: response });
  },
});

export default createResourcesSlice;
