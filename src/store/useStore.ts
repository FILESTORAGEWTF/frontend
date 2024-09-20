import { create } from 'zustand';
import createResourcesSlice, { ResourcesSlice } from './resourcesSlice';

export type AppState = ResourcesSlice;

const useBoundStore = create<AppState>()((set, get, api) => ({
  ...createResourcesSlice(set, get, api),
}));

export default useBoundStore;
