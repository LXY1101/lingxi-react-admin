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
  // Mock项目数据
  const projects: Project[] = [
    {
      id: '1',
      name: 'AI助手核心引擎',
      status: '进行中',
      description: '基于GPT-4的智能对话系统，支持多轮对话和上下文理解',
      progress: 78,
      tags: ['AI', 'Python', '高优先级'],
      members: 3,
      views: 234,
      comments: 18,
      updateTime: '2小时前',
      updateLabel: '更新于'
    },
    {
      id: '2',
      name: '数据可视化平台',
      status: '进行中',
      description: '企业级可视化看板，支持实时数据分析和多维度报表展示',
      progress: 92,
      tags: ['React', 'ECharts', '中优先级'],
      members: 4,
      views: 187,
      comments: 24,
      updateTime: '5小时前',
      updateLabel: '更新于'
    },
    {
      id: '3',
      name: '用户权限管理系统',
      status: '已完成',
      description: '基于RBAC的细粒度权限控制，支持多租户和动态权限配置',
      progress: 100,
      tags: ['后端', 'Node.js', '已完成'],
      members: 5,
      views: 456,
      comments: 32,
      updateTime: '1天前',
      updateLabel: '更新于'
    },
    {
      id: '4',
      name: '移动端SDK开发',
      status: '进行中',
      description: 'iOS和Android双平台SDK，提供统一的API接口和原生性能优化',
      progress: 45,
      tags: ['移动端', 'Swift', 'Kotlin'],
      members: 2,
      views: 145,
      comments: 12,
      updateTime: '3小时前',
      updateLabel: '更新于'
    },
    {
      id: '5',
      name: '微服务网关',
      status: '已暂停',
      description: 'API网关服务，支持路由转发、限流熔断、安全认证等功能',
      progress: 62,
      tags: ['微服务', 'Go', '暂停中'],
      members: 1,
      views: 89,
      comments: 5,
      updateTime: '5天前',
      updateLabel: '更新于'
    },
    {
      id: '6',
      name: '智能推荐引擎',
      status: '进行中',
      description: '基于协同过滤和深度学习的个性化推荐系统',
      progress: 34,
      tags: ['AI', 'TensorFlow', '高优先级'],
      members: 4,
      views: 298,
      comments: 28,
      updateTime: '1小时前',
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
      'AI': 'purple',
      'Python': 'green',
      '高优先级': 'green',
      'React': 'blue',
      'ECharts': 'cyan',
      '中优先级': 'gold',
      '后端': 'red',
      'Node.js': 'orange',
      '已完成': 'green',
      '移动端': 'magenta',
      'Swift': 'orange',
      'Kotlin': 'blue',
      '微服务': 'purple',
      'Go': 'orange',
      '暂停中': 'default',
      'TensorFlow': 'red'
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
              <p className="page-description">管理和查看所有开发项目</p>
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
            <div className="filter-tag">AI</div>
            <div className="filter-tag">Python</div>
            <div className="filter-tag">高优先级</div>
            <div className="filter-tag">React</div>
            <div className="filter-tag">ECharts</div>
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

