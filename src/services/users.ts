import { User } from '../../types/user';
import { APIService } from './api-client';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await APIService.get<User[]>('/user');
  return response.data;
};
