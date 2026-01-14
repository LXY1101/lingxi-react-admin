import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login';

// 路由配置
export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin/*',
    element: <HomePage />,
    requireAuth: true,
  },
  {
    path: '/',
    element: <Navigate to="/admin/dashboard/project-board" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/admin/dashboard/project-board" replace />,
  },
];