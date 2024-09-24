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

export const downloadFile = async (id: number) => {
  try {
    const response = await APIService.get(`/file/download/${id}`, {
      responseType: 'blob',
      withCredentials: true,
    });

    const contentDisposition = response.headers['content-disposition'];
    console.log('Content-Disposition:', contentDisposition);

    const fileName = contentDisposition
      ? contentDisposition.split('filename=')[1].replace(/['"]/g, '')
      : 'downloaded-file';

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', fileName);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};
