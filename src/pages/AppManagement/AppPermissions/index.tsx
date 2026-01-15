import "./index.scss";
import { useState } from 'react';
import { Button, Input, Select, Typography, message } from 'antd';
import {
  SafetyOutlined,
  SearchOutlined,
  UserAddOutlined,
  RightOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// AppPermissions组件 - 应用权限管理
function AppPermissions() {
  const [selectedRole, setSelectedRole] = useState("admin");
  const [activeTab, setActiveTab] = useState<"users" | "permissions">("users");
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [roleSearch, setRoleSearch] = useState("");

  // 模拟角色数据
  const roles = [
    {
      id: "admin",
      name: "管理员",
      description: "拥有所有权限",
      memberCount: 3,
      type: "preset" as const,
    },
    {
      id: "operator",
      name: "运行者",
      description: "可执行和查看",
      memberCount: 8,
      type: "preset" as const,
    },
    {
      id: "developer",
      name: "开发者",
      description: "开发和测试权限",
      memberCount: 12,
      type: "preset" as const,
    },
    {
      id: "member",
      name: "普通成员",
      description: "基础查看权限",
      memberCount: 25,
      type: "custom" as const,
    },
    {
      id: "readonly",
      name: "只读成员",
      description: "仅查看权限",
      memberCount: 15,
      type: "custom" as const,
    },
  ];

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(roleSearch.toLowerCase()),
  );

  return (
    <div className="app-permissions-page">
      {/* 顶部通栏 - 应用权限标题 */}
      <div className="page-header">
        <div className="flex items-center gap-3 mb-1">
          <SafetyOutlined className="w-8 h-8 text-purple-600" />
          <Title level={2} className="page-title">应用权限</Title>
        </div>
        <Paragraph className="page-description">
          基于RBAC的应用权限管理，统一管理角色和权限配置
        </Paragraph>
      </div>

      {/* 下方内容区 - 左右分栏 */}
      <div className="main-content">
        {/* 左侧 - 角色管理模块 */}
        <div className="role-management">
          {/* 头部 */}
          <div className="role-header">
            <Title level={4} className="section-title">角色管理</Title>

            {/* 搜索框 */}
            <div className="search-box">
              <SearchOutlined className="search-icon" />
              <Input
                placeholder="搜索角色..."
                value={roleSearch}
                onChange={(e) => setRoleSearch(e.target.value)}
                size="small"
                className="search-input"
              />
            </div>

            {/* 创建角色按钮 */}
            <Button
              onClick={() => setShowCreateRoleModal(true)}
              type="primary"
              icon={<PlusOutlined className="w-4 h-4" />}
              size="small"
              className="create-role-btn"
            >
              创建角色
            </Button>
          </div>

          {/* 角色列表 */}
          <div className="role-list">
            {/* 预置角色 */}
            <div className="role-group">
              <div className="group-label">预置角色</div>
              <div className="role-items">
                {filteredRoles
                  .filter((r) => r.type === "preset")
                  .map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`role-item ${selectedRole === role.id ? 'active' : ''}`}
                    >
                      <div className="role-info">
                        <div className="flex items-start justify-between mb-1">
                          <Text strong className={`role-name ${selectedRole === role.id ? 'active' : ''}`}>
                            {role.name}
                          </Text>
                          <div className={`member-count ${selectedRole === role.id ? 'active' : ''}`}>
                            {role.memberCount}人
                          </div>
                        </div>
                        <Text className="role-description">
                          {role.description}
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 自定义角色 */}
            <div className="role-group">
              <div className="group-label">自定义角色</div>
              <div className="role-items">
                {filteredRoles
                  .filter((r) => r.type === "custom")
                  .map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`role-item ${selectedRole === role.id ? 'active' : ''}`}
                    >
                      <div className="role-info">
                        <div className="flex items-start justify-between mb-1">
                          <Text strong className={`role-name ${selectedRole === role.id ? 'active' : ''}`}>
                            {role.name}
                          </Text>
                          <div className={`member-count ${selectedRole === role.id ? 'active' : ''}`}>
                            {role.memberCount}人
                          </div>
                        </div>
                        <Text className="role-description">
                          {role.description}
                        </Text>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧 - Tab切换和内容区 */}
        <div className="permission-content">
          {/* Tab切换栏 */}
          <div className="tab-bar">
            <Button
              type="text"
              onClick={() => setActiveTab("users")}
              className={`tab-btn ${activeTab === "users" ? 'active' : ''}`}
            >
              用户管理
            </Button>
            <Button
              type="text"
              onClick={() => setActiveTab("permissions")}
              className={`tab-btn ${activeTab === "permissions" ? 'active' : ''}`}
            >
              权限配置
            </Button>
          </div>

          {/* Tab内容区 */}
          <div className="tab-content">
            {activeTab === "users" ? (
              <UsersTab
                selectedRole={selectedRole}
                onAddMember={() => setShowAddMemberModal(true)}
              />
            ) : (
              <PermissionsTab selectedRole={selectedRole} />
            )}
          </div>
        </div>
      </div>

      {/* 弹窗 */}
      {showCreateRoleModal && (
        <CreateRoleModal
          onClose={() => setShowCreateRoleModal(false)}
        />
      )}
      {showAddMemberModal && (
        <AddMemberModal
          roleId={selectedRole}
          onClose={() => setShowAddMemberModal(false)}
        />
      )}
    </div>
  );
}

// UsersTab组件 - 用户管理Tab
function UsersTab({
  onAddMember,
}: {
  selectedRole: string;
  onAddMember: () => void;
}) {
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // 模拟用户数据
  const users = [
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      role: "管理员",
      roleId: "admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      addedBy: "系统管理员",
      addedTime: "2024-01-15 10:30",
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      role: "开发者",
      roleId: "developer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
      addedBy: "张三",
      addedTime: "2024-01-16 14:20",
    },
    {
      id: 3,
      name: "王五",
      email: "wangwu@example.com",
      role: "运行者",
      roleId: "operator",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      addedBy: "张三",
      addedTime: "2024-01-17 09:15",
    },
    {
      id: 4,
      name: "赵六",
      email: "zhaoliu@example.com",
      role: "开发者",
      roleId: "developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      addedBy: "李四",
      addedTime: "2024-01-18 16:45",
    },
    {
      id: 5,
      name: "孙七",
      email: "sunqi@example.com",
      role: "只读成员",
      roleId: "readonly",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop",
      addedBy: "张三",
      addedTime: "2024-01-19 11:30",
    },
    {
      id: 6,
      name: "周八",
      email: "zhouba@example.com",
      role: "普通成员",
      roleId: "member",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
      addedBy: "王五",
      addedTime: "2024-01-20 13:20",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || user.roleId === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="users-tab">
      {/* 工具栏 */}
      <div className="toolbar">
        <div className="filter-section">
          {/* 角色筛选 */}
          <Select
            placeholder="所有角色"
            value={roleFilter}
            onChange={setRoleFilter}
            size="small"
            className="role-select"
            style={{ width: 120 }}
          >
            <Option value="all">所有角色</Option>
            <Option value="admin">管理员</Option>
            <Option value="developer">开发者</Option>
            <Option value="operator">运行者</Option>
            <Option value="member">普通成员</Option>
            <Option value="readonly">只读成员</Option>
          </Select>

          {/* 搜索框 */}
          <div className="search-container">
            <SearchOutlined className="search-icon" />
            <Input
              placeholder="搜索用户名或邮箱..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              size="small"
              className="user-search-input"
            />
          </div>
        </div>

        {/* 添加成员按钮 */}
        <Button
          onClick={onAddMember}
          type="primary"
          icon={<UserAddOutlined className="w-4 h-4" />}
          size="small"
          className="add-member-btn"
        >
          添加成员
        </Button>
      </div>

      {/* 用户列表 */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-avatar">
              <img src={user.avatar} alt={user.name} className="avatar-img" />
            </div>
            <div className="user-info">
              <Text strong className="user-name">{user.name}</Text>
              <Text className="user-email">{user.email}</Text>
            </div>
            <div className="user-role">
              <div className={`role-tag role-${user.roleId}`}>
                {user.role}
              </div>
            </div>
            <div className="user-meta">
              <Text className="meta-text">{user.addedBy}</Text>
              <Text className="meta-text">{user.addedTime}</Text>
            </div>
          </div>
        ))}
      </div>

      {/* 空状态 */}
      {filteredUsers.length === 0 && (
        <div className="empty-state">
          <SearchOutlined className="empty-icon" />
          <Text strong>未找到用户</Text>
          <Text className="empty-desc">尝试调整搜索条件或筛选器</Text>
        </div>
      )}

      {/* 统计信息 */}
      <div className="stats">
        <Text className="total-count">共 {filteredUsers.length} 个用户</Text>
        <div className="action-buttons">
          <Button type="text" className="action-btn">导出列表</Button>
          <Button type="text" className="action-btn">批量操作</Button>
        </div>
      </div>
    </div>
  );
}

// PermissionsTab组件 - 权限配置Tab
function PermissionsTab({
  selectedRole,
}: {
  selectedRole: string;
}) {
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["pages", "data", "api"]);

  // 权限数据结构
  const permissionGroups = [
    {
      id: "pages",
      name: "页面权限",
      description: "控制用户可访问的页面",
      permissions: [
        { id: "page_dashboard", name: "数据看板", description: "查看应用数据统计" },
        { id: "page_users", name: "用户管理", description: "管理应用用户" },
        { id: "page_settings", name: "系统设置", description: "配置应用设置" },
        { id: "page_logs", name: "操作日志", description: "查看审计日志" },
      ],
    },
    {
      id: "data",
      name: "数据权限",
      description: "控制数据的访问和操作",
      permissions: [
        { id: "data_read", name: "读取数据", description: "查看应用数据" },
        { id: "data_create", name: "创建数据", description: "新增数据记录" },
        { id: "data_update", name: "更新数据", description: "修改已有数据" },
        { id: "data_delete", name: "删除数据", description: "删除数据记录" },
        { id: "data_export", name: "导出数据", description: "导出数据到文件" },
      ],
    },
    {
      id: "api",
      name: "API权限",
      description: "控制API接口调用权限",
      permissions: [
        { id: "api_user", name: "用户API", description: "调用用户相关接口" },
        { id: "api_resource", name: "资源API", description: "调用资源管理接口" },
        { id: "api_webhook", name: "Webhook配置", description: "配置和管理Webhook" },
      ],
    },
    {
      id: "admin",
      name: "管理权限",
      description: "系统管理级别权限",
      permissions: [
        { id: "admin_role", name: "角色管理", description: "创建和编辑角色" },
        { id: "admin_permission", name: "权限配置", description: "分配和调整权限" },
        { id: "admin_system", name: "系统配置", description: "修改系统设置" },
      ],
    },
  ];

  // 模拟已选中的权限（根据角色）
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(
    selectedRole === "admin"
      ? permissionGroups.flatMap((g) => g.permissions.map((p) => p.id))
      : selectedRole === "developer"
        ? ["page_dashboard", "page_users", "data_read", "data_create", "data_update", "api_user", "api_resource"]
        : selectedRole === "operator"
          ? ["page_dashboard", "data_read", "data_export"]
          : ["page_dashboard", "data_read"]
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleAllInGroup = (group: typeof permissionGroups[0]) => {
    const groupPermissionIds = group.permissions.map(p => p.id);
    const allSelected = groupPermissionIds.every(id => selectedPermissions.includes(id));

    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(id => !groupPermissionIds.includes(id)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...groupPermissionIds])]);
    }
  };

  const savePermissions = () => {
    message.success("权限配置已保存");
  };

  return (
    <div className="permissions-tab">
      {/* 顶部工具栏 */}
      <div className="permission-toolbar">
        <div className="section-info">
          <Title level={5} className="section-title">权限配置</Title>
          <Text className="section-desc">为角色配置具体的访问权限</Text>
        </div>
        <div className="toolbar-actions">
          <Button size="small" className="action-btn">全部展开</Button>
          <Button size="small" className="action-btn">全部折叠</Button>
          <Button type="primary" size="small" onClick={savePermissions} className="save-btn">保存更改</Button>
        </div>
      </div>

      {/* 权限统计 */}
      <div className="permission-stats">
        <div className="stat-card">
          <Text strong className="stat-value">{selectedPermissions.length}</Text>
          <Text className="stat-label">已授权权限</Text>
        </div>
        <div className="stat-card">
          <Text strong className="stat-value">{permissionGroups.length}</Text>
          <Text className="stat-label">权限分组</Text>
        </div>
        <div className="stat-card">
          <Text strong className="stat-value">{permissionGroups.flatMap(g => g.permissions).length}</Text>
          <Text className="stat-label">总权限数</Text>
        </div>
      </div>

      {/* 权限树 */}
      <div className="permission-tree">
        {permissionGroups.map((group) => {
          const groupPermissionIds = group.permissions.map(p => p.id);
          const selectedCount = groupPermissionIds.filter(id => selectedPermissions.includes(id)).length;
          const allSelected = selectedCount === groupPermissionIds.length;
          const someSelected = selectedCount > 0 && selectedCount < groupPermissionIds.length;
          const isExpanded = expandedGroups.includes(group.id);

          return (
            <div key={group.id} className="permission-group">
              {/* 分组标题 */}
              <div className="group-header" onClick={() => toggleGroup(group.id)}>
                <div className="group-info">
                  <RightOutlined className={`expand-icon ${isExpanded ? 'expanded' : ''}`} />
                  <div className="group-details">
                    <Text strong className="group-name">{group.name}</Text>
                    <div className={`permission-count ${allSelected ? 'all-selected' : someSelected ? 'part-selected' : ''}`}>
                      {selectedCount}/{groupPermissionIds.length}
                    </div>
                  </div>
                </div>
                <div className="group-description">{group.description}</div>
                <div
                  className={`group-checkbox ${allSelected ? 'checked' : someSelected ? 'indeterminate' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAllInGroup(group);
                  }}
                >
                  {allSelected && <CheckCircleOutlined className="check-icon" />}
                </div>
              </div>

              {/* 权限列表 */}
              {isExpanded && (
                <div className="permission-list">
                  {group.permissions.map((permission) => {
                    const isSelected = selectedPermissions.includes(permission.id);

                    return (
                      <div
                        key={permission.id}
                        className={`permission-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => togglePermission(permission.id)}
                      >
                        <div className={`permission-checkbox ${isSelected ? 'checked' : ''}`}>
                          {isSelected && <CheckCircleOutlined className="check-icon" />}
                        </div>
                        <div className="permission-info">
                          <Text className="permission-name">{permission.name}</Text>
                          <Text className="permission-desc">{permission.description}</Text>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 底部操作栏 */}
      <div className="bottom-actions">
        <Text className="selected-count">
          已选择 <Text strong>{selectedPermissions.length}</Text> 项权限
        </Text>
        <div className="action-buttons">
          <Button size="small" className="reset-btn">重置为默认</Button>
          <Button type="primary" size="small" onClick={savePermissions} className="save-config-btn">保存配置</Button>
        </div>
      </div>
    </div>
  );
}

// CreateRoleModal组件 - 创建角色弹窗
function CreateRoleModal({ onClose }: { onClose: () => void }) {
  const [roleName, setRoleName] = useState("");
  const [roleDesc, setRoleDesc] = useState("");

  const handleCreate = () => {
    if (!roleName) {
      message.error("请输入角色名称");
      return;
    }
    message.success("角色创建成功");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <SafetyOutlined className="modal-icon" />
            <Title level={4} className="title-text">创建角色</Title>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined className="w-4 h-4" />}
            onClick={onClose}
            className="close-btn"
          />
        </div>

        <div className="modal-content">
          <div className="form-item">
            <Text strong className="form-label">角色名称 <span className="required">*</span></Text>
            <Input
              placeholder="例如：产品经理"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-item">
            <Text strong className="form-label">角色描述</Text>
            <Input.TextArea
              placeholder="描述这个角色的职责和权限范围..."
              value={roleDesc}
              onChange={(e) => setRoleDesc(e.target.value)}
              rows={4}
              className="form-textarea"
            />
          </div>

          <div className="form-item">
            <Text strong className="form-label">选择权限模板</Text>
            <div className="template-grid">
              {["只读权限", "标准权限", "高级权限", "自定义配置"].map((template) => (
                <Button
                  key={template}
                  type="default"
                  className="template-btn"
                >
                  <div className="template-name">{template}</div>
                  <div className="template-desc">包含基础查看权限</div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} className="cancel-btn">取消</Button>
          <Button type="primary" onClick={handleCreate} className="confirm-btn">创建角色</Button>
        </div>
      </div>
    </div>
  );
}

// AddMemberModal组件 - 添加成员弹窗
function AddMemberModal({ roleId, onClose }: { roleId: string; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  // 模拟可添加的用户列表
  const availableUsers = [
    {
      id: 10,
      name: "刘九",
      email: "liujiu@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
      department: "产品部",
    },
    {
      id: 11,
      name: "陈十",
      email: "chenshi@example.com",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=40&h=40&fit=crop",
      department: "技术部",
    },
    {
      id: 12,
      name: "杨十一",
      email: "yangshiyi@example.com",
      avatar: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=40&h=40&fit=crop",
      department: "运营部",
    },
    {
      id: 13,
      name: "吴十二",
      email: "wushier@example.com",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=40&h=40&fit=crop",
      department: "设计部",
    },
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (userId: number) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAdd = () => {
    if (selectedUsers.length === 0) {
      message.error("请选择至少一个用户");
      return;
    }
    message.success(`已成功添加 ${selectedUsers.length} 个用户到角色`);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <UserAddOutlined className="modal-icon" />
            <Title level={4} className="title-text">添加成员</Title>
          </div>
          <Button
            type="text"
            icon={<CloseOutlined className="w-4 h-4" />}
            onClick={onClose}
            className="close-btn"
          />
        </div>

        <div className="modal-search">
          <SearchOutlined className="search-icon" />
          <Input
            placeholder="搜索用户名或邮箱..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="modal-content">
          {filteredUsers.length > 0 ? (
            <div className="available-users">
              {filteredUsers.map((user) => {
                const isSelected = selectedUsers.includes(user.id);

                return (
                  <div
                    key={user.id}
                    className={`available-user ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleUser(user.id)}
                  >
                    <div className={`user-checkbox ${isSelected ? 'checked' : ''}`}>
                      {isSelected && <CheckCircleOutlined className="check-icon" />}
                    </div>
                    <div className="user-avatar">
                      <img src={user.avatar} alt={user.name} className="avatar-img" />
                    </div>
                    <div className="user-info">
                      <Text className="user-name">{user.name}</Text>
                      <Text className="user-email">{user.email}</Text>
                    </div>
                    <div className="user-department">{user.department}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <SearchOutlined className="empty-icon" />
              <Text strong>未找到用户</Text>
              <Text className="empty-desc">尝试调整搜索条件</Text>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} className="cancel-btn">取消</Button>
          <Button type="primary" onClick={handleAdd} className="confirm-btn">
            添加 {selectedUsers.length} 人
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppPermissions;
