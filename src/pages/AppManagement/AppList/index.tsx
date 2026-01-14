import "./index.scss";
import { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Dropdown,
  Space,
  Typography,
  Flex
} from 'antd';
import {
  MoreVertical,
  Settings,
  FileText,
  Layers,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  XCircle,
  ChevronUp,
  AlertTriangle,
  Clock,
  ChevronDown,
  Smartphone,
  Monitor,
  Package
} from 'lucide-react';

const { Title, Text, Paragraph } = Typography;

interface Application {
  id: string;
  name: string;
  description: string;
  type: '前端' | '后台' | '移动端' | 'API';
  version: string;
  owner: string;
  status: 'running' | 'stopped' | 'error' | 'deploying';
  statusText: string;
  lastUpdated: string;
  category: 'app' | 'tablet';
}

interface AppListProps {
  onNavigateToSettings?: (appId: string) => void;
}

export function AppsList({ onNavigateToSettings }: AppListProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'app' | 'tablet'>('all');
  const [filterType, setFilterType] = useState('所有应用类型');

  // Mock data - 应用列表数据
  const applications: Application[] = [
    {
      id: '1',
      name: '电商平台管理系统',
      description: '一个功能完善的电商平台后台管理系统，支持商品管理、订单处理、数据分析等核心功能。',
      type: '前端',
      version: 'V26.0.0',
      owner: 'Winna',
      status: 'running',
      statusText: '负载均衡',
      lastUpdated: '2026/1/1',
      category: 'app'
    },
    {
      id: '2',
      name: '智能客服机器人',
      description: '基于AI的智能客服系统，支持自然语言处理、多轮对话、知识库管理等功能。',
      type: '后台',
      version: 'V12.3.1',
      owner: 'Alex',
      status: 'stopped',
      statusText: '已停止',
      lastUpdated: '2025/12/28',
      category: 'app'
    },
    {
      id: '3',
      name: '数据分析Dashboard',
      description: '实时数据可视化分析平台，提供多维度数据统计、自定义报表生成和预警功能。',
      type: '前端',
      version: 'V8.5.2',
      owner: 'Sophie',
      status: 'running',
      statusText: '运行中',
      lastUpdated: '2026/1/13',
      category: 'app'
    },
    {
      id: '4',
      name: '移动端APP后端服务',
      description: '为移动应用提供RESTful API接口，包含用户认证、数据同步、推送通知等服务。',
      type: 'API',
      version: 'V15.0.0',
      owner: 'Mike',
      status: 'error',
      statusText: '异常',
      lastUpdated: '2026/1/12',
      category: 'app'
    },
    {
      id: '5',
      name: '库存管理系统',
      description: '企业级库存管理解决方案，支持多仓库管理、实��库存追踪、智能补货提醒。',
      type: '后台',
      version: 'V22.1.0',
      owner: 'Emma',
      status: 'deploying',
      statusText: '部署中',
      lastUpdated: '2026/1/10',
      category: 'app'
    },
    {
      id: '6',
      name: '企业协作平台',
      description: '团队协作工具，包含项目管理、文档共享、即时通讯、日程安排等功能。',
      type: '前端',
      version: 'V19.8.3',
      owner: 'David',
      status: 'running',
      statusText: '运行中',
      lastUpdated: '2026/1/11',
      category: 'app'
    },
    {
      id: '7',
      name: '移动支付网关',
      description: '安全的支付处理系统，支持多种支付方式、交易加密、风险控制等核心功能。',
      type: 'API',
      version: 'V30.2.1',
      owner: 'Lisa',
      status: 'running',
      statusText: '负载均衡',
      lastUpdated: '2026/1/9',
      category: 'app'
    },
    {
      id: '8',
      name: '内容管理系统',
      description: '灵活的CMS平台，支持多站点管理、内容发布、SEO优化、权限控制等功能。',
      type: '前端',
      version: 'V14.6.0',
      owner: 'Tom',
      status: 'stopped',
      statusText: '已停止',
      lastUpdated: '2025/12/30',
      category: 'app'
    }
  ];

  const filterOptions = ['所有应用类型', '我创建的', '前端应用', '后台服务', 'API接口', '移动应用'];

  // 获取状态配置
  const getStatusConfig = (status: Application['status']) => {
    switch (status) {
      case 'running':
        return {
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          icon: CheckCircle2
        };
      case 'stopped':
        return {
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-600',
          borderColor: 'border-gray-200',
          icon: XCircle
        };
      case 'error':
        return {
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: AlertTriangle
        };
      case 'deploying':
        return {
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200',
          icon: Clock
        };
    }
  };

  // 获取类型配置
  const getTypeConfig = (type: Application['type']) => {
    switch (type) {
      case '前端':
        return {
          bgColor: 'bg-gradient-to-br from-purple-500 to-indigo-600',
          icon: Monitor
        };
      case '后台':
        return {
          bgColor: 'bg-gradient-to-br from-blue-500 to-cyan-600',
          icon: Layers
        };
      case '移动端':
        return {
          bgColor: 'bg-gradient-to-br from-green-500 to-emerald-600',
          icon: Smartphone
        };
      case 'API':
        return {
          bgColor: 'bg-gradient-to-br from-orange-500 to-red-500',
          icon: Package
        };
    }
  };

  // 选应用
  const filteredApps = applications.filter(app => {
    if (activeTab !== 'all' && app.category !== activeTab) return false;
    // 这里可以根据 filterType 进一步筛选
    return true;
  });

  // 下拉菜单状态
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 筛选器下拉菜单
  const filterMenu = {
    items: filterOptions.map(option => ({
      key: option,
      label: (
        <div
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            borderRadius: '4px',
            backgroundColor: filterType === option ? '#f5f3ff' : 'transparent',
            color: filterType === option ? '#7c3aed' : 'inherit',
            fontWeight: filterType === option ? '600' : 'normal'
          }}
          onClick={() => setFilterType(option)}
        >
          {option}
        </div>
      ),
    })),
  };

  // 操作菜单
  const operationMenu = (appId: string) => ({
    items: [
      {
        key: 'settings',
        label: (
          <Button
            type="text"
            icon={<Settings className="w-4 h-4 mr-2" />}
            onClick={() => onNavigateToSettings?.(appId)}
          >
            应用设置
          </Button>
        ),
      },
      {
        key: 'details',
        label: (
          <Button
            type="text"
            danger
            icon={<FileText className="w-4 h-4 mr-2" />}
          >
            应用详情
          </Button>
        ),
      },
    ],
  });

  return (
    <div className="app-list-page">
      <div className="page-header">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={2} className="page-title">应用状态</Title>
            <Paragraph className="page-description">
              <Space>
                <Package className="w-4 h-4" />
                管理和监控所有应用的运行状态
              </Space>
            </Paragraph>
          </div>
          <div className="quota-badge">
            <Text>
              剩余页数限额：<Text strong style={{ color: 'var(--primary)' }}>本月剩余 128</Text>
            </Text>
          </div>
        </div>
      </div>

      {/* 筛选器区域 */}
      <div className="filter-section">
        <Space wrap>
          {/* Tab 切换 */}
          <div className="tab-group">
            <Button
              type="text"
              size="small"
              onClick={() => setActiveTab('all')}
              className={activeTab === 'all' ? 'active-tab' : ''}
            >
              全部
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => setActiveTab('app')}
              className={activeTab === 'app' ? 'active-tab' : ''}
            >
              应用
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => setActiveTab('tablet')}
              className={activeTab === 'tablet' ? 'active-tab' : ''}
            >
              平板
            </Button>
          </div>

          {/* 应用类型筛选 */}
          <Dropdown menu={filterMenu} trigger={['click']} onOpenChange={setDropdownOpen}>
            <Button
              type="default"
              size="small"
              className="filter-dropdown"
            >
              <Space align="center" className="filter-dropdown-content">
                <Tag className="w-3 h-3 text-gray-600" />
                <Text style={{color: '#6b7280'}}>应用测试：</Text><Text>{filterType}</Text>
                {dropdownOpen ? (
                  <ChevronUp className="w-3 h-3 text-gray-400" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                )}
              </Space>
            </Button>
          </Dropdown>
        </Space>
      </div>

      {/* 应用卡片网格 */}
      <Row gutter={[16, 16]}>
        {filteredApps.map((app) => {
          const statusConfig = getStatusConfig(app.status);
          const typeConfig = getTypeConfig(app.type);
          const StatusIcon = statusConfig.icon;
          const TypeIcon = typeConfig.icon;

          return (
            <Col xs={24} sm={12} md={12} lg={12} xl={12} key={app.id}>
              <div className="app-card">
                {/* 应用类型标签 */}
                <div className="app-card-header">
                  <div className={`app-type-tag ${app.type}`}>
                    <TypeIcon className="w-3 h-3 text-white" />
                    <span>{app.type}</span>
                  </div>
                  <Dropdown menu={operationMenu(app.id)} trigger={['click']}>
                    <MoreVertical className="w-5 h-5 text-gray-400 cursor-pointer" />
                  </Dropdown>
                </div>

                {/* 应用名称 */}
                <h3 className="app-name">{app.name}</h3>

                {/* 应用描述 */}
                <p className="app-description">{app.description}</p>

                {/* 底部信息栏 */}
                <div className="app-card-footer">
                  <div className="app-meta">
                    <Space size="small">
                      <Space size="small" align="center">
                        <Tag className="w-3 h-3" />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{app.version}</Text>
                      </Space>
                      <Space size="small" align="center">
                        <User className="w-3 h-3" />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{app.owner}</Text>
                      </Space>
                      <Space size="small" align="center">
                        <Calendar className="w-3 h-3" />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{app.lastUpdated}</Text>
                      </Space>
                    </Space>
                  </div>
                  <div className={`app-status ${app.status}`}>
                    <StatusIcon className="w-3 h-3" />
                    {app.statusText}
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      {/* 空状态提示 */}
      {filteredApps.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <Title level={4} style={{ marginBottom: '8px' }}>暂无应用</Title>
          <Text type="secondary">当前筛选条件下没有找到应用</Text>
        </div>
      )}
    </div>
  );
}

export default AppsList;

