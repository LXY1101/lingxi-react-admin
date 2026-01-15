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
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./index.module.scss";

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
        {
          key: "testing-project-list",
          label: "项目列表",
          path: "/admin/testing/project-list",
          dotClass: "menu-item-dot-orange",
          badge: 5,
        },
        {
          key: "testing-issue-list",
          label: "issue列表",
          path: "/admin/testing/issue-list",
          dotClass: "menu-item-dot-blue",
          badge: 8,
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
        {
          key: "app-permissions",
          label: "应用权限",
          path: "/admin/app/permissions",
          dotClass: "menu-item-dot-blue",
          badge: 0,
        },
      ],
    },
  ];

  const extractModuleKey = (path: string) => {
    const match = path.match(/^\/admin\/(dashboard|development|testing|app)\b/);
    return match?.[1] || "";
  };

  const extractActiveSubKey = () => {
    const path = location.pathname;
    const allItems = modules.flatMap((m) => m.menuItems || []);
    const found = allItems.find((item) => path.startsWith(item.path));
    return found?.key || "";
  };

  const handleMenuClick = (key: string) => {
    const module = modules.find((m) => m.key === key);
    navigate(module?.defaultPath || "/admin/dashboard/project-board");
    setActiveModuleKey(key);
  };

  const recentFiles = [
    { id: 1, name: "Brand Identity", time: "2h ago" },
    { id: 2, name: "Mobile App", time: "3h ago" },
    { id: 3, name: "Website Redesign", time: "5h ago" },
  ];

  const moduleKey = extractModuleKey(location.pathname);
  const isModuleRoute = !!moduleKey;
  const [activeModuleKey, setActiveModuleKey] = useState<string>(moduleKey || modules[0].key);
  useEffect(() => {
    const key = extractModuleKey(location.pathname);
    if (key) {
      setActiveModuleKey(key);
    }
  }, [location.pathname]);

  const activeModule =
    modules.find((m) => m.key === activeModuleKey) || modules[0];
  const activeSubKey = isModuleRoute ? extractActiveSubKey() : "";
  const activeMenuItems = activeModule.menuItems || [];

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      {/* 左侧图标栏 */}
      <div className={styles["sidebar-left-rail"]}>
        {/* 用户头像 */}
        <div className={styles["sidebar-avatar-container"]}>
          <div className={styles["sidebar-avatar-gradient"]}>
            <div className={styles["sidebar-avatar-inner"]}>
              <Avatar
                className={styles["sidebar-avatar-image"]}
                style={{
                  background:
                    "linear-gradient(135deg, #f97316 0%, #ec4899 100%)",
                }}
                icon={<UserOutlined />}
                onClick={() => navigate("/admin/profile")}
              />
            </div>
          </div>
          <div className={styles["sidebar-online-status"]}></div>
        </div>

        {/* 模块图标 */}
        <div className={styles["sidebar-module-icons"]}>
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = isModuleRoute && activeModule.key === module.key;
            return (
              <button
                key={module.key}
                onClick={() => {
                  handleMenuClick(module.key);
                  if (collapsed) onCollapse?.(false);
                }}
                className={`${styles["sidebar-module-icon"]} ${isActive ? styles.active : ""}`}
              >
                {isActive && <div className={styles["module-icon-bg"]}></div>}
                <Icon className={styles["module-icon"]} />
              </button>
            );
          })}

          <div className={styles["sidebar-divider"]}></div>

          <button className={styles["sidebar-module-icon"]}>
            <BellOutlined className={styles["module-icon"]} />
            <span className={styles["sidebar-notification-dot"]}></span>
          </button>
        </div>

        {/* 底部操作 */}
        <div className={styles["sidebar-bottom-actions"]}>
          <button
            className={styles["sidebar-module-icon"]}
            onClick={() => navigate("/admin/setting")}
          >
            <SettingOutlined className={styles["module-icon"]} />
          </button>
          <button
            className={styles["sidebar-module-icon"]}
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
          >
            <LogoutOutlined className={styles["module-icon"]} />
          </button>
        </div>
      </div>

      {/* 可展开面板 */}
      <div className={styles["sidebar-expanded-panel"]}>
        {/* 面板头部 */}
        <div className={styles["sidebar-panel-header"]}>
          <div>
            <h2 className={styles["sidebar-panel-title"]}>{activeModule.name}</h2>
            <p className={styles["sidebar-panel-subtitle"]}>{activeModule.label}</p>
          </div>
          <button
            className={styles["sidebar-collapse-btn"]}
            onClick={() => onCollapse?.(!collapsed)}
          >
            <MenuFoldOutlined />
          </button>
        </div>

        {/* 面板内容 */}
        <div className={styles["sidebar-panel-content"]}>
          {/* 搜索框 */}
          <div className={styles["sidebar-search"]}>
            <Search placeholder="Search..." />
          </div>

          {/* ACTIVE 部分 */}
          {activeMenuItems.length > 0 && (
            <div className={styles["sidebar-section"]}>
              <div className={styles["sidebar-section-header"]}>
                <span className={styles["sidebar-section-title"]}>ACTIVE</span>
                <a href="#" className={styles["sidebar-section-link"]}>
                  View All
                </a>
              </div>
              <div className={styles["sidebar-menu"]}>
                {activeMenuItems.map((item) => (
                  <div
                    key={item.key}
                    className={`${styles["sidebar-menu-item"]} ${
                      activeSubKey === item.key ? styles.active : ""
                    }`}
                    onClick={() => navigate(item.path)}
                  >
                    <div className={`${styles["menu-item-dot"]} ${styles[item.dotClass]}`}></div>
                    <span className={styles["menu-item-text"]}>{item.label}</span>
                    {typeof item.badge === "number" && item.badge > 0 && (
                      <Badge count={item.badge} size="small" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECENT FILES 部分 */}
          <div className={styles["sidebar-section"]}>
            <div className={styles["sidebar-section-header"]}>
              <span className={styles["sidebar-section-title"]}>RECENT FILES</span>
            </div>
            <div className={styles["sidebar-recent-files"]}>
              {recentFiles.map((file) => (
                <div key={file.id} className={styles["recent-file-item"]}>
                  <div className={styles["recent-file-icon-wrapper"]}>
                    <FileTextOutlined className={styles["recent-file-icon"]} />
                  </div>
                  <div className={styles["recent-file-info"]}>
                    <div className={styles["recent-file-name"]}>{file.name}</div>
                    <div className={styles["recent-file-time"]}>Edited {file.time}</div>
                  </div>
                  <MoreOutlined className={styles["recent-file-more"]} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 面板底部 */}
        <div className={styles["sidebar-panel-footer"]}>
          <div className={styles["sidebar-help-card"]}>
            <div className={styles["help-card-icon"]}>
              <UserOutlined />
            </div>
            <div className={styles["help-card-content"]}>
              <div className={styles["help-card-title"]}>Need Help?</div>
              <div className={styles["help-card-desc"]}>Check our docs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
