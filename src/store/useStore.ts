import createModalSlice, { ModalSlice } from './modalSlice';
import { create } from 'zustand';
import createResourcesSlice, { ResourcesSlice } from './resourcesSlice';
import { createUsersSlice, UsersSLice } from './usersSlice';

export type AppState = ResourcesSlice & ModalSlice & UsersSLice;

const useBoundStore = create<AppState>()((set, get, api) => ({
  ...createResourcesSlice(set, get, api),
  ...createModalSlice(set, get, api),
  ...createUsersSlice(set, get, api),
}));

export default useBoundStore;
