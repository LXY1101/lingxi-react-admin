import { Card, Input, Tag, Progress, Avatar, Button } from 'antd';
import { SearchOutlined, UserOutlined, EyeOutlined, MessageOutlined, ClockCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import './index.scss';

// 项目状态类型
type ProjectStatus = '进行中' | '已完成' | '已暂停';

// 项目数据类型
interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  progress: number;
  tags: string[];
  members: number;
  views: number;
  comments: number;
  updateTime: string;
  updateLabel: string;
}

function ProjectList() {
  // Mock测试项目数据
  const projects: Project[] = [
    {
      id: '1',
      name: 'AI助手测试套件',
      status: '进行中',
      description: 'AI助手的功能测试、性能测试和兼容性测试套件',
      progress: 85,
      tags: ['自动化测试', '性能测试', '高优先级'],
      members: 4,
      views: 187,
      comments: 23,
      updateTime: '3小时前',
      updateLabel: '更新于'
    },
    {
      id: '2',
      name: '数据可视化平台测试',
      status: '进行中',
      description: '数据可视化平台的UI测试和数据准确性验证',
      progress: 72,
      tags: ['UI测试', '数据验证', '中优先级'],
      members: 3,
      views: 145,
      comments: 16,
      updateTime: '6小时前',
      updateLabel: '更新于'
    },
    {
      id: '3',
      name: '用户权限管理系统测试',
      status: '已完成',
      description: '用户权限管理系统的功能测试和安全测试',
      progress: 100,
      tags: ['功能测试', '安全测试', '已完成'],
      members: 2,
      views: 203,
      comments: 12,
      updateTime: '2天前',
      updateLabel: '更新于'
    },
    {
      id: '4',
      name: '移动端SDK测试',
      status: '进行中',
      description: '移动端SDK的功能测试和性能测试',
      progress: 58,
      tags: ['移动端测试', '功能测试', '性能测试'],
      members: 5,
      views: 167,
      comments: 19,
      updateTime: '4小时前',
      updateLabel: '更新于'
    },
    {
      id: '5',
      name: '微服务网关测试',
      status: '已暂停',
      description: '微服务网关的接口测试和压力测试',
      progress: 45,
      tags: ['接口测试', '压力测试', '暂停中'],
      members: 3,
      views: 98,
      comments: 8,
      updateTime: '3天前',
      updateLabel: '更新于'
    },
    {
      id: '6',
      name: '智能推荐引擎测试',
      status: '进行中',
      description: '智能推荐引擎的算法测试和效果验证',
      progress: 68,
      tags: ['算法测试', '效果验证', '高优先级'],
      members: 4,
      views: 156,
      comments: 14,
      updateTime: '2小时前',
      updateLabel: '更新于'
    }
  ];

  // 统计信息
  const stats = {
    total: projects.length,
    ongoing: projects.filter(p => p.status === '进行中').length,
    completed: projects.filter(p => p.status === '已完成').length,
    paused: projects.filter(p => p.status === '已暂停').length
  };

  // 获取状态对应的颜色
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case '进行中': return '#1677ff';
      case '已完成': return '#52c41a';
      case '已暂停': return '#d9d9d9';
      default: return '#1677ff';
    }
  };

  // 获取状态对应的标签颜色
  const getStatusTagColor = (status: ProjectStatus) => {
    switch (status) {
      case '进行中': return 'blue';
      case '已完成': return 'green';
      case '已暂停': return 'default';
      default: return 'blue';
    }
  };

  // 获取标签颜色
  const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      '自动化测试': 'purple',
      '性能测试': 'green',
      '高优先级': 'green',
      'UI测试': 'blue',
      '数据验证': 'cyan',
      '中优先级': 'gold',
      '功能测试': 'red',
      '安全测试': 'orange',
      '已完成': 'green',
      '移动端测试': 'magenta',
      '接口测试': 'blue',
      '压力测试': 'orange',
      '暂停中': 'default',
      '算法测试': 'purple',
      '效果验证': 'red'
    };
    return tagColors[tag] || 'default';
  };

  return (
    <div className="project-list-page">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-with-icon">
            <div className="title-icon">
              <ProjectOutlined />
            </div>
            <div className="title-text">
              <h1 className="page-title">项目列表</h1>
              <p className="page-description">管理和查看所有测试项目</p>
            </div>
          </div>
          <div className="header-actions">
            <Button type="primary" size="large" className="create-project-btn">
              + 新建项目
            </Button>
          </div>
        </div>
      </div>

      {/* 筛选和搜索区域 */}
      <div className="filter-section">
        {/* 状态标签页 */}
        <div className="status-tabs">
          <div className="tab active">
            <span>全部项目</span>
            <span className="tab-count">{stats.total}</span>
          </div>
          <div className="tab">
            <span>进行中</span>
            <span className="tab-count">{stats.ongoing}</span>
          </div>
          <div className="tab">
            <span>已完成</span>
            <span className="tab-count">{stats.completed}</span>
          </div>
          <div className="tab">
            <span>已暂停</span>
            <span className="tab-count">{stats.paused}</span>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="search-filter">
          <Input
            placeholder="搜索项目名称或描述..."
            prefix={<SearchOutlined />}
            className="search-input"
          />
          <div className="filter-tags">
            <div className="filter-tag">自动化测试</div>
            <div className="filter-tag">性能测试</div>
            <div className="filter-tag">高优先级</div>
            <div className="filter-tag">UI测试</div>
            <div className="filter-tag">功能测试</div>
          </div>
        </div>
      </div>

      {/* 项目卡片列表 */}
      <div className="projects-grid">
        {projects.map((project) => (
          <Card
            key={project.id}
            variant="card"
            className="project-card"
          >
            {/* 项目基本信息 */}
            <div className="project-header">
              <h3 className="project-name">{project.name}</h3>
              <Tag color={getStatusTagColor(project.status)}>
                {project.status}
              </Tag>
            </div>
            <p className="project-description">{project.description}</p>

            {/* 项目进度 */}
            <div className="project-progress">
              <div className="progress-label">项目进度</div>
              <Progress
              percent={project.progress}
              strokeColor={getStatusColor(project.status)}
              size="small"
              showInfo={false}
            />
              <div className="progress-percent">{project.progress}%</div>
            </div>

            {/* 技术标签 */}
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <Tag key={index} color={getTagColor(tag)}>
                  {tag}
                </Tag>
              ))}
            </div>

            {/* 项目统计和团队 */}
            <div className="project-footer">
              <div className="project-members">
                <div className="member-avatars">
                  {Array.from({ length: Math.min(project.members, 5) }).map((_, index) => (
                    <Avatar
                      key={index}
                      icon={<UserOutlined />}
                      size={24}
                      className="member-avatar"
                      style={{ marginLeft: index > 0 ? -8 : 0 }}
                    />
                  ))}
                  {project.members > 5 && (
                    <Avatar
                      size={24}
                      className="member-avatar"
                      style={{ marginLeft: -8, backgroundColor: '#f0f0f0', color: '#666' }}
                    >
                      +{project.members - 5}
                    </Avatar>
                  )}
                </div>
              </div>

              <div className="project-stats">
                <div className="stat-item">
                  <EyeOutlined className="stat-icon" />
                  <span className="stat-value">{project.views}</span>
                </div>
                <div className="stat-item">
                  <MessageOutlined className="stat-icon" />
                  <span className="stat-value">{project.comments}</span>
                </div>
                <div className="stat-item">
                  <ClockCircleOutlined className="stat-icon" />
                  <span className="stat-value">{project.comments}</span>
                </div>
              </div>

              <div className="project-update">
                <span className="update-label">{project.updateLabel}</span>
                <span className="update-time">{project.updateTime}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectList;