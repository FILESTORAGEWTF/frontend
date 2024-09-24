import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DefaultLayout } from '../layout';
import { Dashboard, Empty, File, Shared } from '../pages';
import { AuthGuard } from './AuthGuard';

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
        element: <AuthGuard Page={Dashboard} />,
      },
      {
        path: 'shared/:folderId?',
        element: <AuthGuard Page={Shared} />,
      },
      {
        path: 'file/:fileId',
        element: <AuthGuard Page={File} />,
      },
      {
        path: 'empty',
        element: <AuthGuard Page={Empty} />,
      },
    ],
  },
]);
