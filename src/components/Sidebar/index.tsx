import { Input, Badge, Avatar, Button } from 'antd';
import {
  SearchOutlined,
  DashboardOutlined,
  ProjectOutlined,
  FileTextOutlined,
  TeamOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './index.scss';

const { Search } = Input;

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/admin/dashboard')) return 'dashboard';
    if (path.includes('/admin/development')) return 'development';
    if (path.includes('/admin/testing')) return 'testing';
    if (path.includes('/admin/apps')) return 'apps';
    return 'dashboard';
  };

  const handleMenuClick = (key: string) => {
    const routeMap: Record<string, string> = {
      dashboard: '/admin/dashboard',
      development: '/admin/development',
      testing: '/admin/testing',
      apps: '/admin/apps',
    };
    navigate(routeMap[key] || '/admin/dashboard');
  };

  const recentFiles = [
    { id: 1, name: 'Brand Identity', time: '2h ago' },
    { id: 2, name: 'Mobile App', time: '3h ago' },
    { id: 3, name: 'Website Redesign', time: '5h ago' },
  ];

  const modules = [
    { key: 'dashboard', icon: DashboardOutlined, label: '开发', name: 'Development' },
    { key: 'development', icon: ProjectOutlined, label: '测试', name: 'Testing' },
    { key: 'testing', icon: FileTextOutlined, label: '应用', name: 'Applications' },
    { key: 'apps', icon: TeamOutlined, label: '用户管理', name: 'Team' },
  ];

  const activeModule = modules.find(m => m.key === getSelectedKey()) || modules[0];

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* 左侧图标栏 */}
      <div className="sidebar-left-rail">
        {/* 用户头像 */}
        <div className="sidebar-user-avatar-wrapper">
          <Avatar
            size={40}
            style={{ 
              background: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
              border: '2px solid #fff'
            }}
            icon={<UserOutlined />}
          />
          <div className="sidebar-user-status"></div>
        </div>

        {/* 模块图标 */}
        <div className="sidebar-module-icons">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = getSelectedKey() === module.key;
            return (
              <button
                key={module.key}
                onClick={() => {
                  handleMenuClick(module.key);
                  if (collapsed) onCollapse?.(false);
                }}
                className={`sidebar-module-icon ${isActive ? 'active' : ''}`}
              >
                {isActive && <div className="module-icon-bg"></div>}
                <Icon className="module-icon" />
              </button>
            );
          })}
          
          <div className="sidebar-divider"></div>
          
          <button className="sidebar-module-icon">
            <BellOutlined className="module-icon" />
            <span className="sidebar-notification-dot"></span>
          </button>
        </div>

        {/* 底部操作 */}
        <div className="sidebar-bottom-actions">
          <button className="sidebar-module-icon">
            <SettingOutlined className="module-icon" />
          </button>
          <button 
            className="sidebar-module-icon"
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
          >
            <LogoutOutlined className="module-icon" />
          </button>
        </div>
      </div>

      {/* 可展开面板 */}
      <div className="sidebar-expanded-panel">
        {/* 面板头部 */}
        <div className="sidebar-panel-header">
          <div>
            <h2 className="sidebar-panel-title">{activeModule.name}</h2>
            <p className="sidebar-panel-subtitle">{activeModule.label}</p>
          </div>
          <button 
            className="sidebar-collapse-btn"
            onClick={() => onCollapse?.(!collapsed)}
          >
            <MenuFoldOutlined />
          </button>
        </div>

        {/* 面板内容 */}
        <div className="sidebar-panel-content">
          {/* 搜索框 */}
          <div className="sidebar-search">
            <Search
              placeholder="Search..."
            />
          </div>

          {/* ACTIVE 部分 */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span className="sidebar-section-title">ACTIVE</span>
              <a href="#" className="sidebar-section-link">View All</a>
            </div>
            <div className="sidebar-menu">
              <div
                className={`sidebar-menu-item ${getSelectedKey() === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleMenuClick('dashboard')}
              >
                <div className="menu-item-dot menu-item-dot-purple"></div>
                <span className="menu-item-text">项目看板</span>
                <Badge count={2} size="small" />
              </div>
              <div
                className={`sidebar-menu-item ${getSelectedKey() === 'development' ? 'active' : ''}`}
                onClick={() => handleMenuClick('development')}
              >
                <div className="menu-item-dot menu-item-dot-orange"></div>
                <span className="menu-item-text">项目管理</span>
                <Badge count={5} size="small" />
              </div>
            </div>
          </div>

          {/* RECENT FILES 部分 */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span className="sidebar-section-title">RECENT FILES</span>
            </div>
            <div className="sidebar-recent-files">
              {recentFiles.map((file) => (
                <div key={file.id} className="recent-file-item">
                  <div className="recent-file-icon-wrapper">
                    <FileTextOutlined className="recent-file-icon" />
                  </div>
                  <div className="recent-file-info">
                    <div className="recent-file-name">{file.name}</div>
                    <div className="recent-file-time">Edited {file.time}</div>
                  </div>
                  <MoreOutlined className="recent-file-more" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 面板底部 */}
        <div className="sidebar-panel-footer">
          <div className="sidebar-help-card">
            <div className="help-card-icon">
              <UserOutlined />
            </div>
            <div className="help-card-content">
              <div className="help-card-title">Need Help?</div>
              <div className="help-card-desc">Check our docs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
