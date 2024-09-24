import createModalSlice, { ModalSlice } from './modalSlice';
import { create } from 'zustand';
import createResourcesSlice, { ResourcesSlice } from './resourcesSlice';
import { createUsersSlice, UsersSLice } from './usersSlice';
import { AuthSLice, createAuthSlice } from './authSlice';

export type AppState = ResourcesSlice & ModalSlice & UsersSLice & AuthSLice

const useBoundStore = create<AppState>()((set, get, api) => ({
  ...createResourcesSlice(set, get, api),
  ...createModalSlice(set, get, api),
  ...createUsersSlice(set, get, api),
  ...createAuthSlice(set, get, api),
}));

export default useBoundStore;
