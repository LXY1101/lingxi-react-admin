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

// 管理后台子路由
export const adminRoutes = [
  {
    path: 'dashboard',
    key: 'dashboard',
    label: '工作台',
  },
  {
    path: 'development',
    key: 'development',
    label: '开发',
  },
  {
    path: 'testing',
    key: 'testing',
    label: '测试',
  },
  {
    path: 'app',
    key: 'app',
    label: '应用管理',
  },
];
