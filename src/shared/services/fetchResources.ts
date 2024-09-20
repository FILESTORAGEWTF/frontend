import { Resource } from '../types';
import { APIService } from './api-client';

export const fetchResources = async (): Promise<Resource[]> => {
  const response = await APIService.get<Resource[]>('/resource');
  return response.data;
};
