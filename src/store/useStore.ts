import createModalSlice, { ModalSlice } from './modalSlice';
import { create } from 'zustand';
import createResourcesSlice, { ResourcesSlice } from './resourcesSlice';

export type AppState = ResourcesSlice & ModalSlice;

const useBoundStore = create<AppState>()((set, get, api) => ({
  ...createResourcesSlice(set, get, api),
  ...createModalSlice(set, get, api),
}));

export default useBoundStore;
