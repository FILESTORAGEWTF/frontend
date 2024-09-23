import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layout';
import { Dashboard, File, Shared } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DefaultLayout,
    children: [
      {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard/:folderId?',
        Component: Dashboard,
      },
      {
        path: 'shared/:folderId?',
        Component: Shared,
      },
      {
        path: 'file/:fileId',
        Component: File,
      },
    ],
  },
]);
