import { Resource } from '../types';
import { CreateResourceData, UpdateResourceData } from '../types/resource';
import { APIService } from './api-client';

export const fetchResources = async (): Promise<Resource[]> => {
  const response = await APIService.get<Resource[]>('/resource');
  return response.data;
};

export const postFolder = async (formData: CreateResourceData): Promise<Resource> => {
  const response = await APIService.post<Resource>('/resource', formData);
  return response.data;
};

export const patchResource = async (formData: UpdateResourceData, id: number): Promise<Resource> => {
  const response = await APIService.patch<Resource>(`/resource/${id}`, formData);
  return response.data;
};

export const deleteResource = async (id: number): Promise<Resource> => {
  const response = await APIService.delete(`/resource/${id}`);
  return response.data;
};
