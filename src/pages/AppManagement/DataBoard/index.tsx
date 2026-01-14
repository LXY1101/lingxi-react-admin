import "./index.scss";
import { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Select,
  Typography,
  Space,
  Divider,
} from 'antd';
import {
  LineChartOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  RocketOutlined,
  DatabaseOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { Title, Text } = Typography;
const { Option } = Select;

function AppsDataBoard() {
  const [dateRange, setDateRange] = useState('近7天');
  const [appTrack, setAppTrack] = useState('所有应用');

  // 统计数据
  const stats = [
    {
      title: '应用总数',
      value: '120',
      change: '+8',
      changePercent: '+7.1%',
      trend: 'up',
      icon: <AppstoreOutlined />,
      color: '#8b5cf6',
    },
    {
      title: '运行中应用',
      value: '115',
      change: '+5',
      changePercent: '+4.5%',
      trend: 'up',
      icon: <CheckCircleOutlined />,
      color: '#10b981',
    },
    {
      title: '异常应用',
      value: '5',
      change: '+3',
      changePercent: '+150%',
      trend: 'up',
      icon: <ExclamationCircleOutlined />,
      color: '#ef4444',
    },
    {
      title: '部署次数',
      value: '35',
      change: '+12',
      changePercent: '+52.2%',
      trend: 'up',
      icon: <RocketOutlined />,
      color: '#3b82f6',
    },
  ];

  // 应用健康趋势数据
  const healthTrendData = [
    { date: '1/7', healthy: 108, warning: 8, error: 4 },
    { date: '1/8', healthy: 110, warning: 7, error: 3 },
    { date: '1/9', healthy: 107, warning: 9, error: 4 },
    { date: '1/10', healthy: 112, warning: 6, error: 2 },
    { date: '1/11', healthy: 113, warning: 5, error: 2 },
    { date: '1/12', healthy: 114, warning: 4, error: 2 },
    { date: '1/13', healthy: 115, warning: 3, error: 5 },
  ];

  // 应用性能指标数据
  const performanceData = [
    { time: '00:00', responseTime: 245, errorRate: 0.5, throughput: 850 },
    { time: '04:00', responseTime: 198, errorRate: 0.3, throughput: 620 },
    { time: '08:00', responseTime: 312, errorRate: 1.2, throughput: 1250 },
    { time: '12:00', responseTime: 385, errorRate: 1.8, throughput: 1580 },
    { time: '16:00', responseTime: 356, errorRate: 1.5, throughput: 1420 },
    { time: '20:00', responseTime: 298, errorRate: 0.9, throughput: 1150 },
    { time: '23:59', responseTime: 268, errorRate: 0.7, throughput: 980 },
  ];

  // 应用健康趋势图表配置 (ECharts)
  const healthTrendOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['健康', '警告', '异常'],
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: healthTrendData.map(item => item.date)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '健康',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0)' }
            ]
          }
        },
        lineStyle: {
          color: '#10b981',
          width: 2
        },
        data: healthTrendData.map(item => item.healthy)
      },
      {
        name: '警告',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0)' }
            ]
          }
        },
        lineStyle: {
          color: '#f59e0b',
          width: 2
        },
        data: healthTrendData.map(item => item.warning)
      },
      {
        name: '异常',
        type: 'line',
        stack: '总量',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0)' }
            ]
          }
        },
        lineStyle: {
          color: '#ef4444',
          width: 2
        },
        data: healthTrendData.map(item => item.error)
      }
    ]
  };

  // 应用性能指标图表配置 (ECharts)
  const performanceOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['响应时间(ms)', '错误率(%)', '吞吐量(req/s)'],
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: performanceData.map(item => item.time)
    },
    yAxis: [
      {
        type: 'value',
        name: '响应时间',
        position: 'left',
        axisLabel: {
          formatter: '{value} ms'
        }
      },
      {
        type: 'value',
        name: '错误率/吞吐量',
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name: '响应时间(ms)',
        type: 'line',
        yAxisIndex: 0,
        symbolSize: 8,
        lineStyle: {
          color: '#8b5cf6',
          width: 3
        },
        itemStyle: {
          color: '#8b5cf6'
        },
        data: performanceData.map(item => item.responseTime)
      },
      {
        name: '错误率(%)',
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 8,
        lineStyle: {
          color: '#ef4444',
          width: 3
        },
        itemStyle: {
          color: '#ef4444'
        },
        data: performanceData.map(item => item.errorRate)
      },
      {
        name: '吞吐量(req/s)',
        type: 'line',
        yAxisIndex: 1,
        symbolSize: 8,
        lineStyle: {
          color: '#10b981',
          width: 3
        },
        itemStyle: {
          color: '#10b981'
        },
        data: performanceData.map(item => item.throughput)
      }
    ]
  };

  // 资源使用情况数据
  const resourceData = [
    { name: 'CPU使用率', value: 72, color: '#8b5cf6', unit: '%' },
    { name: '内存占用', value: 68, color: '#06b6d4', unit: '%' },
    { name: '磁盘I/O', value: 45, color: '#10b981', unit: '%' },
    { name: '网络带宽', value: 58, color: '#f59e0b', unit: '%' },
  ];

  const dateRangeOptions = ['近7天', '近30天', '近90天', '自定义'];
  const appTrackOptions = ['所有应用', 'Web应用', '移动应用', 'API服务', '后台任务'];

  return (
    <div className="app-data-board-page">
      <div className="page-header">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} className="page-title">数据看板</Title>
            <Text type="secondary" className="page-description">
              <Space>
                <ClockCircleOutlined />
                实时监控应用整体运行情况
              </Space>
            </Text>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* 筛选器组 */}
      <Row gutter={[16, 16]} className="filter-group">
        <Col>
          <div className="filter-item-container">
            <Space>
              <Text>日期范围：</Text>
              <Select
                value={dateRange}
                onChange={setDateRange}
                style={{ width: 150 }}
              >
                {dateRangeOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
        </Col>
        <Col>
          <div className="filter-item-container">
            <Space>
              <Text>应用追踪：</Text>
              <Select
                value={appTrack}
                onChange={setAppTrack}
                style={{ width: 150 }}
                className="custom-select"
                dropdownClassName="custom-select-dropdown"

              >
                {appTrackOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>
        </Col>
      </Row>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} className="stats-cards">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable>
              <Row justify="space-between" align="top">
                <Col>
                  <Text type="secondary">{stat.title}</Text>
                  <Statistic
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: stat.color }}
                    suffix={
                      <Space>
                        {stat.trend === 'up' ? (
                          <ArrowUpOutlined style={{ color: '#52c41a' }} />
                        ) : (
                          <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                        )}
                        <Text type={stat.trend === 'up' ? 'success' : 'danger'}>
                          {stat.change} ({stat.changePercent})
                        </Text>
                      </Space>
                    }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} className="charts-section">
        {/* 应用健康趋势 */}
        <Col xs={24} lg={16}>
          <Card title={<span><LineChartOutlined /> 应用健康趋势</span>}>
            <Text type="secondary" className="chart-description">
              过去7天的应用状态统计
            </Text>
            <div className="chart-container">
              <ReactECharts
                option={healthTrendOption}
                style={{ height: '300px', width: '100%' }}
              />
            </div>
          </Card>
        </Col>

        {/* 资源使用情况 */}
        <Col xs={24} lg={8}>
          <Card title={<span><DatabaseOutlined /> 资源使用情况</span>}>
            <Text type="secondary" className="chart-description">
              当前资源占用率
            </Text>
            <div className="resource-container">
              {resourceData.map((resource, index) => (
                <div key={index} className="resource-item">
                  <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text>{resource.name}</Text>
                    <Text strong>{resource.value}{resource.unit}</Text>
                  </Space>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${resource.value}%`,
                        backgroundColor: resource.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Card type="inner" className="performance-card">
              <Row align="middle">
                <Col span={6}>
                  <SettingOutlined style={{ fontSize: 24, color: '#8b5cf6' }} />
                </Col>
                <Col span={18}>
                  <Text strong>整体性能</Text>
                  <br />
                  <Text type="success" strong>良好</Text>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </Row>

      {/* 应用性能指标 */}
      <Row gutter={[16, 16]} className="performance-section">
        <Col xs={24}>
          <Card title={<span><BarChartOutlined /> 应用性能指标</span>}>
            <Text type="secondary" className="chart-description">
              实时监控响应时间、错误率和吞吐量
            </Text>
            <div className="chart-container">
              <ReactECharts
                option={performanceOption}
                style={{ height: '300px', width: '100%' }}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AppsDataBoard;

