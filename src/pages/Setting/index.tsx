import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Select, Switch, Button, Card } from "antd";
import {
  GlobalOutlined,
  SkinOutlined,
  SafetyOutlined,
  ApiOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
  SunOutlined,
  MoonOutlined,
  LaptopOutlined,
  MailOutlined,
  MessageOutlined,
  DesktopOutlined,
  LayoutOutlined,
  DownloadOutlined,
  KeyOutlined,
  EyeOutlined,
  CopyOutlined,
  RedoOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import styles from "./index.module.scss";

const { Sider, Content } = Layout;
const { Option } = Select;

type TabKey = "general" | "appearance" | "security" | "integration" | "system";

function Setting() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  const [language, setLanguage] = useState("zh-CN");
  const [timezone, setTimezone] = useState("Asia/Shanghai");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");
  const [density, setDensity] = useState<"compact" | "standard" | "comfortable">("standard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [apiKeys] = useState([
    { id: "1", name: "Production API Key", key: "sk_live_xxxxxxxxxxxxxx", created: "2024-01-10", lastUsed: "2小时前" },
    { id: "2", name: "Development API Key", key: "sk_test_xxxxxxxxxxxxxx", created: "2024-01-05", lastUsed: "1天前" },
  ]);

  const tabs: Array<{ id: TabKey; label: string; icon: React.ReactNode }> = [
    { id: "general", label: "通用设置", icon: <GlobalOutlined /> },
    { id: "appearance", label: "外观与个性化", icon: <SkinOutlined /> },
    { id: "security", label: "安全与隐私", icon: <SafetyOutlined /> },
    { id: "integration", label: "集成与API", icon: <ApiOutlined /> },
    { id: "system", label: "系统信息", icon: <InfoCircleOutlined /> },
  ];

  return (
    <Layout className={styles["setting-page"]}>
      <div className={styles["profile-header"]}>
        <button onClick={() => navigate(-1)} className={styles["profile-back-btn"]}>
          <ArrowLeftOutlined className={styles.icon} />
          <span className={styles.text}>返回</span>
        </button>
        <h1 className={styles["profile-title"]}>系统设置</h1>
        <p className={styles["profile-subtitle"]}>管理系统配置和偏好设置</p>
      </div>
      <Layout className={styles["setting-container"]}>
        <Sider width={240} theme="light" className={styles["setting-sider"]}>
          <div className={styles["setting-nav"]}>
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`${styles["nav-item"]} ${activeTab === t.id ? styles.active : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                <span className={styles["nav-icon"]}>{t.icon}</span>
                <span className={styles["nav-label"]}>{t.label}</span>
                {activeTab === t.id && <ArrowRightOutlined className={styles["nav-arrow"]} />}
              </button>
            ))}
          </div>
        </Sider>
        <Content className={styles["setting-content"]}>
          {activeTab === "general" && (
            <div className={styles["content-sections"]}>
              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <GlobalOutlined />
                  <span>语言和地区</span>
                </div>
                <div className={styles["section-body"]}>
                  <div className={styles["form-item"]}>
                    <div className={styles["form-label"]}>界面语言</div>
                    <Select value={language} onChange={setLanguage} className={styles["form-control"]}>
                      <Option value="zh-CN">简体中文</Option>
                      <Option value="zh-TW">繁體中文</Option>
                      <Option value="en-US">English (US)</Option>
                      <Option value="ja-JP">日本語</Option>
                    </Select>
                  </div>
                  <div className={styles["form-item"]}>
                    <div className={styles["form-label"]}>时区</div>
                    <Select value={timezone} onChange={setTimezone} className={styles["form-control"]}>
                      <Option value="Asia/Shanghai">北京时间 (UTC+8)</Option>
                      <Option value="Asia/Tokyo">东京时间 (UTC+9)</Option>
                      <Option value="America/New_York">纽约时间 (UTC-5)</Option>
                      <Option value="Europe/London">伦敦时间 (UTC+0)</Option>
                    </Select>
                  </div>
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <SkinOutlined />
                  <span>通知偏好</span>
                </div>
                <div className={`${styles["section-body"]} ${styles["prefs-list"]}`}>
                  <div className={styles["pref-item"]}>
                    <div className={styles["pref-info"]}>
                      <div className={`${styles["pref-icon"]} ${styles.email}`}>
                        <MailOutlined />
                      </div>
                      <div>
                        <div className={styles["pref-title"]}>邮件通知</div>
                        <div className={styles["pref-desc"]}>接收重要更新和提醒邮件</div>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onChange={setEmailNotifications} />
                  </div>
                  <div className={styles["pref-item"]}>
                    <div className={styles["pref-info"]}>
                      <div className={`${styles["pref-icon"]} ${styles.push}`}>
                        <MessageOutlined />
                      </div>
                      <div>
                        <div className={styles["pref-title"]}>站内消息</div>
                        <div className={styles["pref-desc"]}>在系统内接收通知消息</div>
                      </div>
                    </div>
                    <Switch checked={pushNotifications} onChange={setPushNotifications} />
                  </div>
                  <div className={styles["pref-item"]}>
                    <div className={styles["pref-info"]}>
                      <div className={`${styles["pref-icon"]} ${styles.desktop}`}>
                        <DesktopOutlined />
                      </div>
                      <div>
                        <div className={styles["pref-title"]}>桌面通知</div>
                        <div className={styles["pref-desc"]}>通过浏览器推送桌面通知</div>
                      </div>
                    </div>
                    <Switch checked={desktopNotifications} onChange={setDesktopNotifications} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className={styles["content-sections"]}>
              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <SkinOutlined />
                  <span>主题模式</span>
                </div>
                <div className={styles["theme-grid"]}>
                  <button 
                    className={`${styles["theme-option"]} ${theme === "light" ? styles.active : ""}`} 
                    onClick={() => setTheme("light")}
                  >
                    <SunOutlined className={styles["theme-icon"]} />
                    <div className={styles["theme-label"]}>浅色模式</div>
                    {theme === "light" && <CheckOutlined className={styles["theme-check"]} />}
                  </button>
                  <button 
                    className={`${styles["theme-option"]} ${theme === "dark" ? styles.active : ""}`} 
                    onClick={() => setTheme("dark")}
                  >
                    <MoonOutlined className={styles["theme-icon"]} />
                    <div className={styles["theme-label"]}>深色模式</div>
                    {theme === "dark" && <CheckOutlined className={styles["theme-check"]} />}
                  </button>
                  <button 
                    className={`${styles["theme-option"]} ${theme === "auto" ? styles.active : ""}`} 
                    onClick={() => setTheme("auto")}
                  >
                    <LaptopOutlined className={styles["theme-icon"]} />
                    <div className={styles["theme-label"]}>跟随系统</div>
                    {theme === "auto" && <CheckOutlined className={styles["theme-check"]} />}
                  </button>
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <LayoutOutlined />
                  <span>界面密度</span>
                </div>
                <div className={styles["density-list"]}>
                  <button 
                    className={`${styles["density-option"]} ${density === "compact" ? styles.active : ""}`} 
                    onClick={() => setDensity("compact")}
                  >
                    <div>
                      <div className={styles["density-label"]}>紧凑</div>
                      <div className={styles["density-desc"]}>显示更多内容，减少间距</div>
                    </div>
                    {density === "compact" && <CheckOutlined className={styles["density-check"]} />}
                  </button>
                  <button 
                    className={`${styles["density-option"]} ${density === "standard" ? styles.active : ""}`} 
                    onClick={() => setDensity("standard")}
                  >
                    <div>
                      <div className={styles["density-label"]}>标准</div>
                      <div className={styles["density-desc"]}>默认推荐，平衡的视觉体验</div>
                    </div>
                    {density === "standard" && <CheckOutlined className={styles["density-check"]} />}
                  </button>
                  <button 
                    className={`${styles["density-option"]} ${density === "comfortable" ? styles.active : ""}`} 
                    onClick={() => setDensity("comfortable")}
                  >
                    <div>
                      <div className={styles["density-label"]}>宽松</div>
                      <div className={styles["density-desc"]}>更大的间距，适合触屏设备</div>
                    </div>
                    {density === "comfortable" && <CheckOutlined className={styles["density-check"]} />}
                  </button>
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <LayoutOutlined />
                  <span>侧边栏设置</span>
                </div>
                <div className={`${styles["pref-item"]} ${styles.single}`}>
                  <div>
                    <div className={styles["pref-title"]}>默认折叠侧边栏</div>
                    <div className={styles["pref-desc"]}>启动时自动折叠左侧导航栏</div>
                  </div>
                  <Switch checked={sidebarCollapsed} onChange={setSidebarCollapsed} />
                </div>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div className={styles["content-sections"]}>
              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <SafetyOutlined />
                  <span>登录会话管理</span>
                </div>
                <div className={styles["session-list"]}>
                  {[{ device: "Chrome on MacBook Pro", location: "北京, 中国", time: "当前会话", active: true },
                    { device: "Safari on iPhone 14", location: "北京, 中国", time: "2小时前", active: false },
                    { device: "Edge on Windows 11", location: "上海, 中国", time: "1天前", active: false }].map((s, i) => (
                    <div key={i} className={styles["session-item"]}>
                      <div className={styles["session-info"]}>
                        <DesktopOutlined className={styles["session-icon"]} />
                        <div>
                          <div className={styles["session-title"]}>
                            {s.device}
                            {s.active && <span className={styles["session-active"]}>活跃</span>}
                          </div>
                          <div className={styles["session-sub"]}>{s.location}</div>
                          <div className={styles["session-sub"]}>{s.time}</div>
                        </div>
                      </div>
                      {!s.active && <Button type="text" danger>撤销</Button>}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <LayoutOutlined />
                  <span>操作日志</span>
                </div>
                <div className={styles["log-list"]}>
                  {[{ action: "修改了项目配置", time: "5分钟前", type: "update" },
                    { action: "创建了新的API密钥", time: "2小时前", type: "create" },
                    { action: "删除了测试环境", time: "1天前", type: "delete" },
                    { action: "更新了团队成员权限", time: "2天前", type: "update" }].map((log, i) => (
                    <div key={i} className={`${styles["log-item"]} ${styles[log.type]}`}>
                      <div className={styles["log-dot"]} />
                      <div className={styles["log-action"]}>{log.action}</div>
                      <div className={styles["log-time"]}>{log.time}</div>
                    </div>
                  ))}
                </div>
                <Button type="text" className={styles["log-more"]}>查看完整日志 →</Button>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <DownloadOutlined />
                  <span>数据导出与备份</span>
                </div>
                <div className={styles["export-desc"]}>导出您的所有数据，包括项目配置、代码和设置信息</div>
                <Button type="primary" className={styles["export-btn"]} icon={<DownloadOutlined />}>导出所有数据</Button>
              </Card>
            </div>
          )}

          {activeTab === "integration" && (
            <div className={styles["content-sections"]}>
              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <KeyOutlined />
                  <span>API 密钥管理</span>
                </div>
                <div className={styles["section-actions"]}>
                  <Button icon={<PlusOutlined />}>创建新密钥</Button>
                </div>
                <div className={styles["keys-list"]}>
                  {apiKeys.map((k) => (
                    <div key={k.id} className={styles["key-item"]}>
                      <div className={styles["key-info"]}>
                        <div className={styles["key-name"]}>{k.name}</div>
                        <div className={styles["key-line"]}>
                          <code className={styles["key-code"]}>{k.key}</code>
                          <Button type="text" icon={<CopyOutlined />} />
                          <Button type="text" icon={<EyeOutlined />} />
                        </div>
                      </div>
                      <div className={styles["key-actions"]}>
                        <Button type="text" icon={<RedoOutlined />} />
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </div>
                      <div className={styles["key-meta"]}>
                        <span>创建于 {k.created}</span>
                        <span>•</span>
                        <span>最后使用 {k.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <ApiOutlined />
                  <span>Webhook 配置</span>
                </div>
                <div className={styles["section-actions"]}>
                  <Button icon={<PlusOutlined />}>添加 Webhook</Button>
                </div>
                <div className={styles["webhook-empty"]}>
                  <ApiOutlined className={styles["webhook-icon"]} />
                  <div className={styles["webhook-text"]}>暂无 Webhook 配置</div>
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <ApiOutlined />
                  <span>第三方服务集成</span>
                </div>
                <div className={styles["integrations-grid"]}>
                  {[{ name: "GitHub", icon: "🐙", connected: true },
                    { name: "GitLab", icon: "🦊", connected: false },
                    { name: "Slack", icon: "💬", connected: true },
                    { name: "Discord", icon: "🎮", connected: false }].map((s) => (
                    <div key={s.name} className={styles["integration-item"]}>
                      <div className={styles["integration-head"]}>
                        <div className={styles["integration-icon"]}>{s.icon}</div>
                        <div className={styles["integration-info"]}>
                          <div className={styles["integration-name"]}>{s.name}</div>
                          <div className={`${styles["integration-status"]} ${s.connected ? styles.connected : ""}`}>
                            {s.connected ? "已连接" : "未连接"}
                          </div>
                        </div>
                      </div>
                      <Button className={`${styles["integration-btn"]} ${s.connected ? styles.manage : styles.connect}`}>
                        {s.connected ? "管理" : "连接"}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === "system" && (
            <div className={styles["content-sections"]}>
              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <InfoCircleOutlined />
                  <span>系统版本</span>
                </div>
                <div className={styles["version-card"]}>
                  <div className={styles["version-badge"]}>V2</div>
                  <div className={styles["version-info"]}>
                    <div className={styles["version-title"]}>AI 全栈低代码开发平台 v2.5.0</div>
                    <div className={styles["version-sub"]}>最新稳定版本 · 发布于 2024-01-10</div>
                    <Button type="link">查看更新日志 →</Button>
                  </div>
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <InfoCircleOutlined />
                  <span>使用统计</span>
                </div>
                <div className={styles["stats-grid"]}>
                  {[{ label: "总项目数", value: "24" },
                    { label: "API 调用", value: "128K" },
                    { label: "团队成员", value: "12" }].map((st, i) => (
                    <div key={i} className={styles["stat-item"]}>
                      <div className={styles["stat-value"]}>{st.value}</div>
                      <div className={styles["stat-label"]}>{st.label}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={styles["section-card"]}>
                <div className={styles["section-title"]}>
                  <InfoCircleOutlined />
                  <span>技术栈信息</span>
                </div>
                <div className={styles["tech-grid"]}>
                  {[{ name: "React", version: "18.3.1" },
                    { name: "TypeScript", version: "5.3.3" },
                    { name: "Ant Design", version: "5.x" },
                    { name: "Vite", version: "5.0.0" }].map((t) => (
                    <div key={t.name} className={styles["tech-item"]}>
                      <span className={styles["tech-name"]}>{t.name}</span>
                      <span className={styles["tech-version"]}>{t.version}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Setting;