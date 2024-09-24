import { Resource } from '~/types';
import { APIService } from './api-client';

export const uploadFile = async (formData: FormData): Promise<Resource> => {
  const response = await APIService.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
