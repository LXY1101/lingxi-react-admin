import { Layout } from 'antd';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardProjectBoard from '../../pages/Dashboard/ProjectBoard';
import DashboardProjectList from '../../pages/Dashboard/ProjectList';
import DevelopmentDataBoard from '../../pages/Development/DataBoard';
import DevelopmentProjectList from '../../pages/Development/ProjectList';
import DevelopmentIssueList from '../../pages/Development/IssueList';
import DevelopmentProjectDev from '../../pages/Development/ProjectDev';
import TestingAutomation from '../../pages/Testing/Automation';
import TestingSandbox from '../../pages/Testing/Sandbox';
import TestingIssueList from '../../pages/Testing/IssueList';
import TestingProjectList from '../../pages/Testing/ProjectList';
import AppDataBoard from '../../pages/AppManagement/DataBoard';
import AppList from '../../pages/AppManagement/AppList';
import AppPermissions from '../../pages/AppManagement/AppPermissions';
import Profile from '../../pages/Profile';
import Setting from '../../pages/Setting';
import styles from './index.module.scss';

const { Content } = Layout;

function AdminPanel() {

  return (
    <Layout className={styles["admin-panel"]}>
      <Layout className={styles["admin-content-layout"]}>
        <Content className={styles["admin-content"]}>
          <div className={styles["admin-content-inner"]}>
            <Routes>
              {/* 工作台 */}
              <Route path="dashboard" element={<Navigate to="/admin/dashboard/project-board" replace />} />
              <Route path="dashboard/project-board" element={<DashboardProjectBoard />} />
              <Route path="dashboard/project-list" element={<DashboardProjectList />} />

              {/* 开发 */}
              <Route path="development" element={<Navigate to="/admin/development/data-board" replace />} />
              <Route path="development/data-board" element={<DevelopmentDataBoard />} />
              <Route path="development/project-list" element={<DevelopmentProjectList />} />
              <Route path="development/issue-list" element={<DevelopmentIssueList />} />
              <Route path="development/project-dev" element={<DevelopmentProjectDev />} />

              {/* 测试 */}
              <Route path="testing" element={<Navigate to="/admin/testing/automation" replace />} />
              <Route path="testing/automation" element={<TestingAutomation />} />
              <Route path="testing/sandbox" element={<TestingSandbox />} />
              <Route path="testing/project-list" element={<TestingProjectList />} />
              <Route path="testing/issue-list" element={<TestingIssueList />} />

              {/* 应用管理 */}
              <Route path="app" element={<Navigate to="/admin/app/data-board" replace />} />
              <Route path="app/data-board" element={<AppDataBoard />} />
              <Route path="app/app-list" element={<AppList />} />
              <Route path="app/permissions" element={<AppPermissions />} />

              {/* 个人中心 */}
              <Route path="profile" element={<Profile />} />
              {/* 设置 */}
              <Route path="setting" element={<Setting />} />

              {/* 默认 */}
              <Route path="" element={<Navigate to="/admin/dashboard/project-board" replace />} />
              <Route path="*" element={<Navigate to="/admin/dashboard/project-board" replace />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminPanel;
