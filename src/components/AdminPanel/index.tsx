import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProjectBoard from '../../pages/ProjectBoard';
import ProjectManagement from '../../pages/ProjectManagement';
import ProjectList from '../../pages/ProjectList';
import TestingAutomation from '../../pages/TestingAutomation';
import TestingSandbox from '../../pages/TestingSandbox';
import AppsDataBoard from '../../pages/AppsDataBoard';
import AppsList from '../../pages/AppsList';
import './index.scss';

const { Content } = Layout;

function AdminPanel() {

  return (
    <Layout className="admin-panel">
      <Layout className="admin-content-layout">
        <Content className="admin-content">
          <div className="admin-content-inner">
            <Routes>
              {/* 控制台 */}
              <Route path="dashboard" element={<Navigate to="dashboard/board" replace />} />
              <Route path="dashboard/board" element={<ProjectBoard />} />
              <Route path="dashboard/list" element={<ProjectList />} />

              {/* 开发 */}
              <Route path="development" element={<Navigate to="development/board" replace />} />
              <Route path="development/board" element={<ProjectBoard />} />
              <Route path="development/manage" element={<ProjectManagement />} />

              {/* 测试 */}
              <Route path="testing" element={<Navigate to="testing/automation" replace />} />
              <Route path="testing/automation" element={<TestingAutomation />} />
              <Route path="testing/sandbox" element={<TestingSandbox />} />

              {/* 应用管理 */}
              <Route path="apps" element={<Navigate to="apps/data-board" replace />} />
              <Route path="apps/data-board" element={<AppsDataBoard />} />
              <Route path="apps/list" element={<AppsList />} />

              {/* 默认 */}
              <Route path="" element={<Navigate to="development/board" replace />} />
              <Route path="*" element={<Navigate to="development/board" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
