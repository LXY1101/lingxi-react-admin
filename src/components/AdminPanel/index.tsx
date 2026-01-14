import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardProjectBoard from '../../pages/Dashboard/ProjectBoard';
import DashboardProjectList from '../../pages/Dashboard/ProjectList';
import DevelopmentProjectBoard from '../../pages/Development/ProjectBoard';
import DevelopmentProjectList from '../../pages/Development/ProjectList';
import TestingAutomation from '../../pages/Testing/Automation';
import TestingSandbox from '../../pages/Testing/Sandbox';
import AppDataBoard from '../../pages/AppManagement/DataBoard';
import AppList from '../../pages/AppManagement/AppList';
import Profile from '../../pages/Profile';
import './index.scss';

const { Content } = Layout;

function AdminPanel() {

  return (
    <Layout className="admin-panel">
      <Layout className="admin-content-layout">
        <Content className="admin-content">
          <div className="admin-content-inner">
            <Routes>
              {/* 工作台 */}
              <Route path="dashboard" element={<Navigate to="dashboard/project-board" replace />} />
              <Route path="dashboard/project-board" element={<DashboardProjectBoard />} />
              <Route path="dashboard/project-list" element={<DashboardProjectList />} />

              {/* 开发 */}
              <Route path="development" element={<Navigate to="development/project-board" replace />} />
              <Route path="development/project-board" element={<DevelopmentProjectBoard />} />
              <Route path="development/project-list" element={<DevelopmentProjectList />} />

              {/* 测试 */}
              <Route path="testing" element={<Navigate to="testing/automation" replace />} />
              <Route path="testing/automation" element={<TestingAutomation />} />
              <Route path="testing/sandbox" element={<TestingSandbox />} />

              {/* 应用管理 */}
              <Route path="app" element={<Navigate to="app/data-board" replace />} />
              <Route path="app/data-board" element={<AppDataBoard />} />
              <Route path="app/app-list" element={<AppList />} />

              {/* 个人中心 */}
              <Route path="profile" element={<Profile />} />

              {/* 默认 */}
              <Route path="" element={<Navigate to="development/project-board" replace />} />
              <Route path="*" element={<Navigate to="development/project-board" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
