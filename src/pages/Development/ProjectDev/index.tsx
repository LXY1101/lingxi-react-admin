import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Typography,
  Divider,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import './index.module.scss';

const { Sider, Content } = Layout;
const { Title } = Typography;

// 菜单数据
const menuItems: MenuProps['items'] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
    children: [
      { key: 'dashboard-home', label: '工作台', icon: <HomeOutlined /> },
      { key: 'dashboard-analytics', label: '数据分析', icon: <PieChartOutlined /> },
    ],
  },
  {
    key: 'projects',
    icon: <AppstoreOutlined />,
    label: '项目',
    children: [
      { key: 'projects-list', label: '项目列表', icon: <AppstoreOutlined /> },
      { key: 'projects-new', label: '新建项目', icon: <AppstoreOutlined /> },
    ],
  },
  {
    key: 'tasks',
    icon: <FileTextOutlined />,
    label: '任务',
    children: [
      { key: 'tasks-todo', label: '待办任务', icon: <FileTextOutlined /> },
      { key: 'tasks-done', label: '已完成任务', icon: <FileTextOutlined /> },
    ],
  },
  {
    key: 'team',
    icon: <TeamOutlined />,
    label: '团队',
    children: [
      { key: 'team-members', label: '团队成员', icon: <UserOutlined /> },
      { key: 'team-schedule', label: '团队日程', icon: <CalendarOutlined /> },
    ],
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '设置',
  },
];

const SidebarLayout: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState(['dashboard-home']);
  const [openKeys, setOpenKeys] = useState(['dashboard']);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key]);
  };

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <div>
      <Layout>
        {/* 左侧边栏 */}
        <Sider 
          width={240}
        >
          <div>
            <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
              系统管理
            </Title>
          </div>
          
          <Divider style={{ margin: '16px 0' }} />
          
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={handleOpenChange}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </Sider>

        {/* 右侧内容区域 */}
        <Content>
        </Content>
      </Layout>
    </div>
  );
};

export default SidebarLayout;