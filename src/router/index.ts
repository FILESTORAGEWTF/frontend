import { createBrowserRouter } from 'react-router-dom';
import { DefaultLayout } from '../layout';
import { File, Folder } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        path: 'folder',
        Component: Folder,
      },
      {
        path: 'folder/:folderId',
        Component: Folder,
      },
      {
        path: 'file/:fileId',
        Component: File,
      },
    ],
  },
]);
