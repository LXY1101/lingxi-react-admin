import { Card, Input, Tag, Button, Select, Space, Table, Avatar } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined, ClockCircleOutlined, UserOutlined, TagOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { useState } from 'react';
import './index.scss';

// Issue类型定义
type IssueStatus = 'open' | 'in_progress' | 'closed' | 'todo' | 'review';
type IssuePriority = 'high' | 'medium' | 'low' | 'urgent';

interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  author: string;
  assignee: string;
  labels: string[];
  created_at: string;
  updated_at: string;
  comments: number;
  is_starred: boolean;
}

function IssueList() {
  // Mock数据
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: '1',
      title: '修复数据看板图表显示异常问题',
      description: '在数据看板中，AI项目的图表无法正常加载，需要检查API请求和数据处理逻辑。',
      status: 'open',
      priority: 'high',
      author: '张伟',
      assignee: '李娜',
      labels: ['bug', '数据看板', 'high-priority'],
      created_at: '2026-01-10',
      updated_at: '2026-01-14',
      comments: 5,
      is_starred: true
    },
    {
      id: '2',
      title: '用户中心模块优化',
      description: '优化用户中心的界面布局和交互体验，提升加载性能。',
      status: 'in_progress',
      priority: 'medium',
      author: '王强',
      assignee: '张伟',
      labels: ['enhancement', '用户中心', 'frontend'],
      created_at: '2026-01-09',
      updated_at: '2026-01-13',
      comments: 8,
      is_starred: false
    },
    {
      id: '3',
      title: 'API文档更新',
      description: '更新所有公开API的文档，添加示例代码和参数说明。',
      status: 'todo',
      priority: 'low',
      author: '刘芳',
      assignee: '王强',
      labels: ['documentation', 'backend'],
      created_at: '2026-01-08',
      updated_at: '2026-01-12',
      comments: 2,
      is_starred: true
    },
    {
      id: '4',
      title: '权限系统bug修复',
      description: '管理员角色无法访问某些功能模块，需要检查权限配置。',
      status: 'review',
      priority: 'high',
      author: '李娜',
      assignee: '刘芳',
      labels: ['bug', '权限系统', 'backend'],
      created_at: '2026-01-07',
      updated_at: '2026-01-11',
      comments: 12,
      is_starred: false
    },
    {
      id: '5',
      title: '移动端适配优化',
      description: '优化应用在移动端的显示效果和交互体验。',
      status: 'open',
      priority: 'medium',
      author: '张伟',
      assignee: '李娜',
      labels: ['enhancement', 'mobile', 'frontend'],
      created_at: '2026-01-06',
      updated_at: '2026-01-10',
      comments: 6,
      is_starred: true
    },
    {
      id: '6',
      title: '数据库性能优化',
      description: '优化数据库查询性能，减少响应时间。',
      status: 'closed',
      priority: 'urgent',
      author: '王强',
      assignee: '王强',
      labels: ['performance', 'database', 'backend'],
      created_at: '2026-01-05',
      updated_at: '2026-01-09',
      comments: 15,
      is_starred: false
    }
  ]);

  // 筛选状态
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });

  // 获取状态颜色
  const getStatusColor = (status: IssueStatus) => {
    const colors: Record<IssueStatus, string> = {
      open: 'blue',
      in_progress: 'cyan',
      closed: 'green',
      todo: 'default',
      review: 'orange'
    };
    return colors[status];
  };

  // 获取状态文本
  const getStatusText = (status: IssueStatus) => {
    const texts: Record<IssueStatus, string> = {
      open: '打开',
      in_progress: '进行中',
      closed: '已关闭',
      todo: '待处理',
      review: '审核中'
    };
    return texts[status];
  };

  // 获取优先级颜色
  const getPriorityColor = (priority: IssuePriority) => {
    const colors: Record<IssuePriority, string> = {
      high: 'red',
      medium: 'orange',
      low: 'green',
      urgent: 'volcano'
    };
    return colors[priority];
  };

  // 获取优先级文本
  const getPriorityText = (priority: IssuePriority) => {
    const texts: Record<IssuePriority, string> = {
      high: '高',
      medium: '中',
      low: '低',
      urgent: '紧急'
    };
    return texts[priority];
  };

  // 切换星标状态
  const toggleStar = (id: string) => {
    setIssues(issues.map(issue => 
      issue.id === id ? { ...issue, is_starred: !issue.is_starred } : issue
    ));
  };

  // 表格列配置
  const columns = [
    {
      title: '',
      key: 'star',
      width: 40,
      render: (_, record: Issue) => (
        <span 
          className="star-icon"
          onClick={() => toggleStar(record.id)}
        >
          {record.is_starred ? <StarFilled /> : <StarOutlined />}
        </span>
      )
    },
    {
      title: '议题',
      key: 'title',
      render: (_, record: Issue) => (
        <div className="issue-title-column">
          <div className="issue-title">{record.title}</div>
          <div className="issue-meta">
            <Tag color={getStatusColor(record.status)}>{getStatusText(record.status)}</Tag>
            <Tag color={getPriorityColor(record.priority)}>{getPriorityText(record.priority)}</Tag>
            {record.labels.map((label, index) => (
              <Tag key={index} color="blue">{label}</Tag>
            ))}
          </div>
        </div>
      )
    },
    {
      title: '指派人',
      key: 'assignee',
      width: 100,
      render: (_, record: Issue) => (
        <Avatar size="small" icon={<UserOutlined />}>{record.assignee.charAt(0)}</Avatar>
      )
    },
    {
      title: '作者',
      key: 'author',
      width: 100,
      render: (_, record: Issue) => (
        <Avatar size="small" icon={<UserOutlined />}>{record.author.charAt(0)}</Avatar>
      )
    },
    {
      title: '创建时间',
      key: 'created_at',
      width: 120,
      render: (_, record: Issue) => (
        <div className="issue-date">{record.created_at}</div>
      )
    },
    {
      title: '评论',
      key: 'comments',
      width: 60,
      render: (_, record: Issue) => (
        <div className="issue-comments">{record.comments}</div>
      )
    }
  ];

  return (
    <div className="issue-list-page">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-with-icon">
            <div className="title-icon">
              <TagOutlined />
            </div>
            <div className="title-text">
              <h1 className="page-title">Issue列表</h1>
              <p className="page-description">管理和跟踪所有开发任务和问题</p>
            </div>
          </div>
          <div className="header-actions">
            <Button type="primary" size="large" className="create-issue-btn">
              <PlusOutlined /> 新建Issue
            </Button>
          </div>
        </div>
      </div>

      {/* 筛选和搜索区域 */}
      <div className="filter-section">
        <Card bordered={false} className="filter-card">
          <div className="filter-content">
            <div className="search-filter">
              <Input
                placeholder="搜索Issue标题或描述..."
                prefix={<SearchOutlined />}
                className="search-input"
              />
            </div>
            <div className="advanced-filters">
              <Space size="middle">
                <Select
                  placeholder="状态"
                  style={{ width: 120 }}
                  className="filter-select"
                >
                  <Select.Option value="all">全部</Select.Option>
                  <Select.Option value="open">打开</Select.Option>
                  <Select.Option value="in_progress">进行中</Select.Option>
                  <Select.Option value="closed">已关闭</Select.Option>
                </Select>
                <Select
                  placeholder="优先级"
                  style={{ width: 120 }}
                  className="filter-select"
                >
                  <Select.Option value="all">全部</Select.Option>
                  <Select.Option value="high">高</Select.Option>
                  <Select.Option value="medium">中</Select.Option>
                  <Select.Option value="low">低</Select.Option>
                </Select>
                <Select
                  placeholder="指派人"
                  style={{ width: 120 }}
                  className="filter-select"
                >
                  <Select.Option value="all">全部</Select.Option>
                  <Select.Option value="张伟">张伟</Select.Option>
                  <Select.Option value="李娜">李娜</Select.Option>
                  <Select.Option value="王强">王强</Select.Option>
                </Select>
                <Button icon={<FilterOutlined />}>高级筛选</Button>
              </Space>
            </div>
          </div>
        </Card>
      </div>

      {/* Issue列表 */}
      <div className="issue-list-section">
        <Table
          columns={columns}
          dataSource={issues}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="issue-table"
        />
      </div>
    </div>
  );
}

export default IssueList;