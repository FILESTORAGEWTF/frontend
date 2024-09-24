import { StateCreator } from 'zustand';

import { User } from '../types/user';
import { fetchUsers } from '../services/users';

export interface UsersSLice {
  users: User[];
  setUsers: () => Promise<void>;
}

export const createUsersSlice: StateCreator<UsersSLice> = (set) => ({
  users: [],
  setUsers: async () => {
    const usersArray = await fetchUsers();
    set({ users: usersArray });
  },
});
