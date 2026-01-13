import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Development from '../../pages/Development';
import Testing from '../../pages/Testing';
import AppManagement from '../../pages/AppManagement';
import './index.scss';

const { Content } = Layout;

function AdminPanel() {

  return (
    <Layout className="admin-panel">
      <Layout className="admin-content-layout">
        <Content className="admin-content">
          <div className="admin-content-inner">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="development" element={<Development />} />
              <Route path="testing" element={<Testing />} />
              <Route path="apps" element={<AppManagement />} />
              <Route path="" element={<Navigate to="dashboard" replace />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
