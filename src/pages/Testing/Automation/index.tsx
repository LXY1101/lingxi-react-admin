import { 
  Card, 
  Statistic, 
  Row, 
  Col, 
  Progress, 
  List, 
  Avatar, 
  Button, 
  Tag,
  DatePicker
} from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  ProjectOutlined,
  BugOutlined,
  DashboardOutlined,
  LoadingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import './index.scss';

function TestingDataDashboard() {
  // 动态注入日期选择器主题色样式
  useEffect(() => {
    // 创建style元素
    const style = document.createElement('style');
    style.id = 'custom-date-picker-styles';
    
    // 注入高优先级样式 - 使用标准CSS语法
    style.textContent = `
      /* ===== 完全重置日期选择器范围选择样式 ===== */
      
      /* 1. 重置所有范围相关的默认样式 */
      .ant-picker-cell-in-range,
      .ant-picker-cell-range-middle,
      .ant-picker-cell-range-start,
      .ant-picker-cell-range-end {
        background-color: transparent !important;
      }
      
      /* 2. 重置所有范围内容的背景色 */
      .ant-picker-cell-in-range .ant-picker-cell-inner,
      .ant-picker-cell-range-middle .ant-picker-cell-inner,
      .ant-picker-cell-range-start .ant-picker-cell-inner,
      .ant-picker-cell-range-end .ant-picker-cell-inner {
        background-color: transparent !important;
        border-color: transparent !important;
      }
      
      /* 3. 重新定义范围开始日期 */
      .ant-picker-cell-range-start .ant-picker-cell-inner {
        background-color: #722ed1 !important;
        color: #fff !important;
        border-radius: 4px 0 0 4px !important;
      }
      
      /* 4. 重新定义范围结束日期 */
      .ant-picker-cell-range-end .ant-picker-cell-inner {
        background-color: #722ed1 !important;
        color: #fff !important;
        border-radius: 0 4px 4px 0 !important;
      }
      
      /* 5. 特殊情况：当天开始和结束 */
      .ant-picker-cell-range-start.ant-picker-cell-range-end .ant-picker-cell-inner {
        border-radius: 4px !important;
      }
      
      /* 6. 重新定义范围中间日期 - 核心修复 */
      .ant-picker-cell-in-range,
      .ant-picker-cell-range-middle {
        background-color: rgba(114, 46, 209, 0.1) !important;
      }
      
      .ant-picker-cell-in-range .ant-picker-cell-inner,
      .ant-picker-cell-range-middle .ant-picker-cell-inner {
        color: #722ed1 !important;
        font-weight: 500 !important;
      }
      
      /* 7. 修复相邻单元格的连接 - 关键 */
      .ant-picker-cell-range-start + .ant-picker-cell-in-range,
      .ant-picker-cell-in-range + .ant-picker-cell-in-range,
      .ant-picker-cell-in-range + .ant-picker-cell-range-end {
        background-color: rgba(114, 46, 209, 0.1) !important;
      }
      
      /* 8. 清除所有伪元素的黑色背景 */
      .ant-picker-cell-in-range::before,
      .ant-picker-cell-in-range::after,
      .ant-picker-cell-range-middle::before,
      .ant-picker-cell-range-middle::after {
        background-color: transparent !important;
        border: none !important;
      }
      
      /* 9. 确保下拉框内的所有范围样式一致 */
      .ant-picker-dropdown .ant-picker-cell-in-range,
      .ant-picker-dropdown .ant-picker-cell-range-middle {
        background-color: rgba(114, 46, 209, 0.1) !important;
      }
      
      .ant-picker-dropdown .ant-picker-cell-in-range .ant-picker-cell-inner,
      .ant-picker-dropdown .ant-picker-cell-range-middle .ant-picker-cell-inner {
        color: #722ed1 !important;
      }
      
      /* 10. 修复表格结构 */
      .ant-picker-content table {
        border-collapse: collapse;
      }
      
      .ant-picker-content td {
        border: none !important;
      }
      
      /* 11. 范围悬停效果 */
      .ant-picker-cell-range-hover {
        background-color: rgba(114, 46, 209, 0.3) !important;
      }
      
      .ant-picker-cell-range-hover .ant-picker-cell-inner {
        color: #722ed1 !important;
      }
      
      /* 12. 活动状态 */
      .ant-picker-cell-active-with-range .ant-picker-cell-inner {
        background-color: #722ed1 !important;
        color: #fff !important;
      }
      
      /* 13. 额外修复：确保所有范围日期都使用正确的背景色 */
      .ant-picker-panel .ant-picker-body .ant-picker-content .ant-picker-cell-in-range,
      .ant-picker-panel .ant-picker-body .ant-picker-content .ant-picker-cell-range-middle {
        background-color: rgba(114, 46, 209, 0.1) !important;
      }
    `;
    
    // 添加到head
    document.head.appendChild(style);
    
    // 清理函数
    return () => {
      const existingStyle = document.getElementById('custom-date-picker-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);
  
  // Mock数据
  const stats = [
    { title: '项目总数', value: 24, icon: <ProjectOutlined />, change: +3, color: '#722ed1', bgColor: '#f5f0ff' },
    { title: '进行中项目', value: 12, icon: <DashboardOutlined />, change: +2, color: '#1890ff', bgColor: '#e6f7ff' },
    { title: '活跃Issues', value: 87, icon: <BugOutlined />, change: -5, color: '#fa8c16', bgColor: '#fff7e6' },
    { title: '团队成员', value: 32, icon: <TeamOutlined />, change: 0, color: '#52c41a', bgColor: '#f6ffed' }
  ];

  const projectHealth = [
    { name: 'AI助手重构', status: '健康', progress: 78, issues: 0, commits: 124 },
    { name: '用户中心模块', status: '健康', progress: 92, issues: 3, commits: 89 },
    { name: '数据看板优化', status: '警告', progress: 45, issues: 15, commits: 56 },
    { name: '权限系统升级', status: '风险', progress: 34, issues: 22, commits: 42 },
    { name: 'API网关服务', status: '健康', progress: 68, issues: 12, commits: 98 }
  ];

  const issueFlow = [
    { status: '待处理', count: 28, change: +5, color: '#d9d9d9' },
    { status: '进行中', count: 35, change: +8, color: '#1677ff' },
    { status: '已完成', count: 142, change: -24, color: '#52c41a' }
  ];

  const developmentActivities = [
    { user: '张伟', action: '提交了新代码', project: 'AI助手重构', time: '59分钟前', avatar: <UserOutlined /> },
    { user: '李娜', action: '关闭了Issue #234', project: '用户中心模块', time: '12分钟前', avatar: <UserOutlined /> },
    { user: '王强', action: '完成里程碑 v2.1', project: '数据看板优化', time: '1小时前', avatar: <UserOutlined /> },
    { user: '刘芳', action: '推送了3个提交', project: '权限系统升级', time: '2小时前', avatar: <UserOutlined /> }
  ];

  const teamLoad = [
    { name: '张伟', load: 12, max: 15, color: '#faad14' },
    { name: '李娜', load: 8, max: 15, color: '#52c41a' },
    { name: '王强', load: 14, max: 15, color: '#ff4d4f' },
    { name: '刘芳', load: 10, max: 15, color: '#52c41a' },
    { name: '陈明', load: 6, max: 15, color: '#52c41a' }
  ];

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '健康': return '#52c41a';
      case '警告': return '#faad14';
      case '风险': return '#ff4d4f';
      default: return '#d9d9d9';
    }
  };

  return (
    <div className="testing-data-dashboard">
      {/* 页面头部 */}
      <div className="page-header">
        <div className="header-content">
          <div className="title-with-icon">
            <div className="title-icon">
              <BarChartOutlined />
            </div>
            <div className="title-text">
              <h1 className="page-title">测试数据看板</h1>
              <p className="page-subtitle">查看项目测试进度和关键指标</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <DatePicker.RangePicker
            style={{ marginRight: 16 }}
            // 添加自定义类名以应用主题色样式
            className="custom-theme-date-picker"
          />
          <Button type="primary">导出报告</Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-section">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card bordered={false} className="custom-stat-card">
              <div className="card-header">
                <div 
                  className="icon-container"
                  style={{ 
                    backgroundColor: stat.bgColor, 
                    color: stat.color 
                  }}
                >
                  {stat.icon}
                </div>
                {stat.change !== 0 && (
                  <div className={`change-indicator ${stat.change > 0 ? 'positive' : 'negative'}`}>
                    {stat.change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    {Math.abs(stat.change)}
                  </div>
                )}
              </div>
              <div className="card-value">{stat.value}</div>
              <div className="card-title">{stat.title}</div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 主要内容区域 */}
      <Row gutter={[16, 16]} className="main-content">
        {/* 项目健康度 */}
        <Col xs={24} lg={16}>
          <Card title="项目健康度" bordered={false} className="health-card">
            <div className="health-list">
              {projectHealth.map((project, index) => (
                <div key={index} className="health-item">
                  <div className="health-header">
                    <div className="project-info">
                      <span className="project-name">{project.name}</span>
                      <Tag color={getStatusColor(project.status)}>
                        {getStatusColor(project.status) === '#52c41a' && <CheckCircleOutlined />}
                        {getStatusColor(project.status) === '#faad14' && <ClockCircleOutlined />}
                        {getStatusColor(project.status) === '#ff4d4f' && <LoadingOutlined />}
                        {project.status}
                      </Tag>
                    </div>
                    <span className="progress-percent">{project.progress}%</span>
                  </div>
                  <Progress
                    percent={project.progress}
                    strokeColor={getStatusColor(project.status)}
                    size="small"
                  />
                  <div className="project-metrics">
                    <span>{project.commits} 提交</span>
                    <span>{project.issues} Issues</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Issues流转 */}
        <Col xs={24} lg={8}>
          <Card title="Issues流转" bordered={false} className="issues-card">
            <div className="issue-flow">
              {issueFlow.map((issue, index) => (
                <div key={index} className="issue-item">
                  <div className="issue-header">
                    <span className="issue-status">{issue.status}</span>
                    <span className={issue.change > 0 ? 'text-green-500' : 'text-red-500'}>
                      {issue.change > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      {Math.abs(issue.change)}
                    </span>
                  </div>
                  <div className="issue-count">{issue.count} 个</div>
                  <Progress
                    percent={issue.status === '已完成' ? 100 : (issue.count / 200) * 100}
                    strokeColor={issue.color}
                    size="small"
                  />
                </div>
              ))}
            </div>
            <div className="completion-rate">
              <div className="rate-header">
                <span>完成率</span>
                <span className="rate-value">69.3%</span>
              </div>
              <Progress
                type="circle"
                percent={69.3}
                size={80}
                strokeColor={{
                  '0%': '#52c41a',
                  '100%': '#1677ff',
                }}
              />
            </div>
          </Card>
        </Col>

        {/* 测试活动 */}
        <Col xs={24} lg={12}>
          <Card title="测试活动" bordered={false} className="activity-card">
            <List
              dataSource={developmentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar icon={item.avatar} />
                    }
                    title={
                      <div className="activity-title">
                        <span className="user-name">{item.user}</span>
                        <span className="activity-action">{item.action}</span>
                      </div>
                    }
                    description={
                      <div className="activity-desc">
                        <span className="project-name">{item.project}</span>
                        <span className="activity-time">{item.time}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div className="view-more">
              <Button type="text">查看更多活动</Button>
            </div>
          </Card>
        </Col>

        {/* 团队负载 */}
        <Col xs={24} lg={12}>
          <Card title="团队负载" bordered={false} className="team-card">
            <div className="team-load">
              {teamLoad.map((member, index) => (
                <div key={index} className="team-member">
                  <div className="member-header">
                    <div className="member-info">
                      <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                      <span className="member-name">{member.name}</span>
                    </div>
                    <span className="load-value">{member.load}/{member.max}</span>
                  </div>
                  <Progress
                    percent={(member.load / member.max) * 100}
                    strokeColor={
                      member.load > member.max * 0.8 ? '#ff4d4f' : 
                      member.load > member.max * 0.6 ? '#faad14' : '#52c41a'
                    }
                    size="small"
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default TestingDataDashboard;

