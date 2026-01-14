import { Card, Input, Tag, Button, Select, Space, Avatar } from 'antd';
import { SearchOutlined, FilterOutlined, PlusOutlined, UserOutlined, TagOutlined, StarOutlined, StarFilled, ClockCircleOutlined } from '@ant-design/icons';
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
  assignee_name: string;
  processor: string;
  processor_name: string;
  process_description: string;
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
      title: '登录页面兼容性测试',
      description: '测试登录页面在不同浏览器和设备上的兼容性，包括Chrome、Firefox、Safari和Edge等主流浏览器。',
      status: 'in_progress',
      priority: 'high',
      author: '张三',
      assignee: '李四',
      assignee_name: '李四',
      processor: '王五',
      processor_name: '王五',
      process_description: '已完成Chrome和Firefox的兼容性测试，发现了3个CSS布局问题，正在修复中。',
      labels: ['测试', '兼容性', 'high-priority'],
      created_at: '2026-01-10',
      updated_at: '2026-01-14',
      comments: 3,
      is_starred: true
    },
    {
      id: '2',
      title: 'API接口自动化测试',
      description: '为用户管理模块的所有API接口编写自动化测试用例，确保接口功能正常。',
      status: 'open',
      priority: 'medium',
      author: '李四',
      assignee: '赵六',
      assignee_name: '赵六',
      processor: '赵六',
      processor_name: '赵六',
      process_description: '正在编写登录和注册接口的测试用例，已完成50%。',
      labels: ['测试', '自动化', 'API'],
      created_at: '2026-01-09',
      updated_at: '2026-01-13',
      comments: 8,
      is_starred: false
    },
    {
      id: '3',
      title: '数据导出功能测试',
      description: '测试数据导出功能，包括Excel、CSV和PDF格式，确保导出数据的准确性和完整性。',
      status: 'closed',
      priority: 'medium',
      author: '王五',
      assignee: '孙七',
      assignee_name: '孙七',
      processor: '孙七',
      processor_name: '孙七',
      process_description: '已完成所有格式的导出测试，未发现异常，测试通过。',
      labels: ['测试', '数据', 'export'],
      created_at: '2026-01-08',
      updated_at: '2026-01-12',
      comments: 2,
      is_starred: true
    },
    {
      id: '4',
      title: '移动端适配测试',
      description: '测试应用在不同移动设备上的适配情况，包括屏幕尺寸、分辨率和触摸交互。',
      status: 'todo',
      priority: 'urgent',
      author: '赵六',
      assignee: '张三',
      assignee_name: '张三',
      processor: '',
      processor_name: '',
      process_description: '待分配处理人',
      labels: ['测试', '移动端', '适配'],
      created_at: '2026-01-07',
      updated_at: '2026-01-11',
      comments: 12,
      is_starred: false
    },
    {
      id: '5',
      title: '性能测试报告生成',
      description: '根据性能测试结果生成详细的测试报告，包括响应时间、吞吐量和资源使用率等指标。',
      status: 'review',
      priority: 'low',
      author: '孙七',
      assignee: '李四',
      assignee_name: '李四',
      processor: '王五',
      processor_name: '王五',
      process_description: '测试报告已完成，正在等待审核。',
      labels: ['测试', '性能', '报告'],
      created_at: '2026-01-06',
      updated_at: '2026-01-10',
      comments: 6,
      is_starred: true
    },
    {
      id: '6',
      title: '用户权限测试',
      description: '测试不同用户角色的权限控制，确保权限分配正确，用户只能访问其授权的功能。',
      status: 'in_progress',
      priority: 'high',
      author: '张三',
      assignee: '赵六',
      assignee_name: '赵六',
      processor: '孙七',
      processor_name: '孙七',
      process_description: '已完成管理员和普通用户角色的权限测试，正在测试VIP用户角色。',
      labels: ['测试', '权限', 'security'],
      created_at: '2026-01-05',
      updated_at: '2026-01-09',
      comments: 9,
      is_starred: false
    }
  ]);

  // 状态文本映射
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

  // 状态颜色映射
  const getStatusColor = (status: IssueStatus) => {
    const colors: Record<IssueStatus, string> = {
      open: 'blue',
      in_progress: 'orange',
      closed: 'green',
      todo: 'default',
      review: 'purple'
    };
    return colors[status];
  };

  // 优先级颜色映射
  const getPriorityColor = (priority: IssuePriority) => {
    const colors: Record<IssuePriority, string> = {
      high: 'red',
      medium: 'gold',
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
              <h1 className="page-title">测试Issue列表</h1>
              <p className="page-description">管理和跟踪所有测试任务和问题</p>
            </div>
          </div>
          <div className="header-actions">
            <Button type="primary" size="large" className="create-issue-btn">
              <PlusOutlined /> 新建Issue
            </Button>
          </div>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="filter-section">
        <Card variant="outlined" className="filter-card">
          <div className="filter-content">
            <div className="search-filter">
              <Input
                placeholder="搜索测试Issue标题或描述..."
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
                  <Select.Option value="李四">李四</Select.Option>
                  <Select.Option value="王五">王五</Select.Option>
                  <Select.Option value="赵六">赵六</Select.Option>
                </Select>
                <Button icon={<FilterOutlined />}>高级筛选</Button>
              </Space>
            </div>
          </div>
        </Card>
      </div>

      {/* Issue列表 */}
      <div className="issue-list-section">
        <Card variant="outlined" className="issue-list-container">
          <div className="issue-list">
            {issues.map((issue) => (
              <div key={issue.id} className="issue-list-item">
                {/* 左侧星标 */}
                <div className="issue-star">
                  <span 
                    className="star-icon"
                    onClick={() => toggleStar(issue.id)}
                  >
                    {issue.is_starred ? <StarFilled /> : <StarOutlined />}
                  </span>
                </div>

                {/* 中间议题内容 */}
                <div className="issue-content">
                  <div className="issue-title">{issue.title}</div>
                  <div className="issue-tags">
                    <Tag color={getStatusColor(issue.status)}>{getStatusText(issue.status)}</Tag>
                    <Tag color={getPriorityColor(issue.priority)}>{getPriorityText(issue.priority)}</Tag>
                    {issue.labels.map((label, index) => (
                      <Tag key={index} color="blue">{label}</Tag>
                    ))}
                  </div>
                </div>

                {/* 右侧元数据 */}
                <div className="issue-meta">
                  <div className="issue-user">
                    <div className="user-info">
                      <span className="user-label">作者:</span>
                      <Avatar size="small" icon={<UserOutlined />}>{issue.author.charAt(0)}</Avatar>
                      <span>{issue.author}</span>
                    </div>
                  </div>
                  <div className="issue-user">
                    <div className="user-info">
                      <span className="user-label">指派人:</span>
                      <Avatar size="small" icon={<UserOutlined />}>{issue.assignee.charAt(0)}</Avatar>
                      <span>{issue.assignee}</span>
                    </div>
                  </div>
                  <div className="issue-date">
                    <ClockCircleOutlined /> {issue.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default IssueList;