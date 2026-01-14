import { Input, Badge, Avatar } from "antd";
import {
  DashboardOutlined,
  ProjectOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./index.scss";

const { Search } = Input;

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const modules = [
    // 工作台
    {
      key: "dashboard",
      icon: DashboardOutlined,
      label: "工作台",
      name: "工作台",
      defaultPath: "/admin/dashboard/project-board",
      menuItems: [
        {
          key: "dashboard-project-board",
          label: "项目看板",
          path: "/admin/dashboard/project-board",
          dotClass: "menu-item-dot-purple",
          badge: 2,
        },
        {
          key: "dashboard-project-list",
          label: "项目管理",
          path: "/admin/dashboard/project-list",
          dotClass: "menu-item-dot-orange",
          badge: 5,
        },
      ],
    },
    // 开发
    {
      key: "development",
      icon: ProjectOutlined,
      label: "开发",
      name: "Development",
      defaultPath: "/admin/development/data-board",
      menuItems: [
        {
          key: "development-data-board",
          label: "数据看板",
          path: "/admin/development/data-board",
          dotClass: "menu-item-dot-purple",
          badge: 2,
        },
        {
          key: "development-project-list",
          label: "项目列表",
          path: "/admin/development/project-list",
          dotClass: "menu-item-dot-orange",
          badge: 5,
        },
        {
          key: "development-issue-list",
          label: "issue列表",
          path: "/admin/development/issue-list",
          dotClass: "menu-item-dot-blue",
          badge: 12,
        },
      ],
    },
    // 测试
    {
      key: "testing",
      icon: FileTextOutlined,
      label: "测试",
      name: "Testing",
      defaultPath: "/admin/testing/automation",
      menuItems: [
        {
          key: "testing-automation",
          label: "测试数据看板",
          path: "/admin/testing/automation",
          dotClass: "menu-item-dot-purple",
          badge: 1,
        },
        {
          key: "testing-sandbox",
          label: "版本管理",
          path: "/admin/testing/sandbox",
          dotClass: "menu-item-dot-orange",
        },
      ],
    },
    // 应用管理
    {
      key: "app",
      icon: AppstoreOutlined,
      label: "应用管理",
      name: "Applications",
      defaultPath: "/admin/app/data-board",
      menuItems: [
        {
          key: "app-data-board",
          label: "数据看板",
          path: "/admin/app/data-board",
          dotClass: "menu-item-dot-purple",
          badge: 3,
        },
        {
          key: "app-list",
          label: "应用列表",
          path: "/admin/app/app-list",
          dotClass: "menu-item-dot-orange",
          badge: 8,
        },
      ],
    },
  ];

  const getModuleKeyFromPath = () => {
    const path = location.pathname;
    if (path.includes("/admin/dashboard")) return "dashboard";
    if (path.includes("/admin/development")) return "development";
    if (path.includes("/admin/testing")) return "testing";
    if (path.includes("/admin/app")) return "app";
    return "dashboard";
  };

  const getActiveSubKeyFromPath = () => {
    const path = location.pathname;
    // 工作台
    if (path.includes("/admin/dashboard/project-board")) return "dashboard-project-board";
    if (path.includes("/admin/dashboard/project-list")) return "dashboard-project-list";
    // 开发
    if (path.includes("/admin/development/project-board")) return "development-project-board";
    if (path.includes("/admin/development/project-list"))
      return "development-project-list";
    // 测试
    if (path.includes("/admin/testing/automation")) return "testing-automation";
    if (path.includes("/admin/testing/sandbox")) return "testing-sandbox";
    // 应用管理
    if (path.includes("/admin/app/data-board")) return "app-data-board";
    if (path.includes("/admin/app/app-list")) return "app-list";
    return "";
  };

  const handleMenuClick = (key: string) => {
    const module = modules.find((m) => m.key === key);
    navigate(module?.defaultPath || "/admin/development/project-board");
  };

  const recentFiles = [
    { id: 1, name: "Brand Identity", time: "2h ago" },
    { id: 2, name: "Mobile App", time: "3h ago" },
    { id: 3, name: "Website Redesign", time: "5h ago" },
  ];

  const activeModule =
    modules.find((m) => m.key === getModuleKeyFromPath()) || modules[0];
  const activeSubKey = getActiveSubKeyFromPath();
  const activeMenuItems = activeModule.menuItems || [];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* 左侧图标栏 */}
      <div className="sidebar-left-rail">
        {/* 用户头像 */}
        <div className="sidebar-avatar-container">
          <div className="sidebar-avatar-gradient">
            <div className="sidebar-avatar-inner">
              <Avatar
                className="sidebar-avatar-image"
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                }}
                icon={<UserOutlined />}
                onClick={() => navigate("/admin/profile")}
              />
            </div>
          </div>
          <div className="sidebar-online-status"></div>
        </div>

        {/* 模块图标 */}
        <div className="sidebar-module-icons">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = activeModule.key === module.key;
            return (
              <button
                key={module.key}
                onClick={() => {
                  handleMenuClick(module.key);
                  if (collapsed) onCollapse?.(false);
                }}
                className={`sidebar-module-icon ${isActive ? "active" : ""}`}
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
              navigate("/login", { replace: true });
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
            <Search placeholder="Search..." />
          </div>

          {/* ACTIVE 部分 */}
          {activeMenuItems.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-header">
                <span className="sidebar-section-title">ACTIVE</span>
                <a href="#" className="sidebar-section-link">
                  View All
                </a>
              </div>
              <div className="sidebar-menu">
                {activeMenuItems.map((item) => (
                  <div
                    key={item.key}
                    className={`sidebar-menu-item ${
                      activeSubKey === item.key ? "active" : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <div className={`menu-item-dot ${item.dotClass}`}></div>
                    <span className="menu-item-text">{item.label}</span>
                    {typeof item.badge === "number" && item.badge > 0 && (
                      <Badge count={item.badge} size="small" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

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
