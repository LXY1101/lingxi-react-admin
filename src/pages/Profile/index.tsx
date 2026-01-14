import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Tabs, Form, Input, Tag, message } from "antd";
import {
  ArrowLeftOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  EditOutlined,
  SaveOutlined,
  SafetyCertificateOutlined,
  KeyOutlined,
  LinkOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./index.scss";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"basic" | "security">("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const [formData, setFormData] = useState({
    username: "user_2024",
    realName: "张小明",
    department: "产品研发部",
    position: "高级前端工程师",
    email: "zhangxiaoming@company.com",
    phone: "138****8888",
    location: "北京市朝阳区",
  });

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setFormData(values);
      setIsEditing(false);
      message.success("已保存更改");
    } catch {
      message.error("请完善表单信息");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button onClick={() => navigate(-1)} className="profile-back-btn">
          <ArrowLeftOutlined className="icon" />
          <span className="text">返回</span>
        </button>
        <h1 className="profile-title">个人中心</h1>
        <p className="profile-subtitle">管理您的个人信息和账号设置</p>
      </div>

      <div className="profile-container">
        <div className="profile-hero-card">
          <div className="profile-hero-content">
            <Avatar
              size={96}
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=faces"
            />
            <div className="profile-hero-right">
              <div className="profile-summary-top">
                <div>
                  <div className="profile-name">{formData.realName}</div>
                  <div className="profile-username">@{formData.username}</div>
                  <div className="profile-meta">
                    <div className="profile-meta-item">
                      <IdcardOutlined />
                      <span>{formData.position}</span>
                    </div>
                    <div className="profile-meta-item">
                      <EnvironmentOutlined />
                      <span>{formData.department}</span>
                    </div>
                  </div>
                </div>
                {!isEditing && (
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => {
                      setIsEditing(true);
                      form.setFieldsValue(formData);
                    }}
                  >
                    编辑资料
                  </Button>
                )}
              </div>
              <div className="profile-contact">
                <div className="profile-contact-item">
                  <MailOutlined />
                  <span>{formData.email}</span>
                </div>
                <div className="profile-contact-item">
                  <PhoneOutlined />
                  <span>{formData.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-main-card">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => setActiveTab(key as "basic" | "security")}
            items={[
              {
                key: "basic",
                label: (
                  <span className="profile-tab-label">
                    <UserOutlined />
                    <span>基本信息</span>
                  </span>
                ),
                children: (
                  <div className="profile-tabs-content">
                    <Form
                      form={form}
                      layout="vertical"
                      initialValues={formData}
                      disabled={!isEditing}
                    >
                      <div className="profile-form-grid">
                        <Form.Item
                          name="username"
                          label="用户名"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="realName"
                          label="真实姓名"
                          rules={[{ required: true }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name="department" label="所属部门">
                          <Input />
                        </Form.Item>
                        <Form.Item name="position" label="职位">
                          <Input />
                        </Form.Item>
                        <Form.Item
                          name="email"
                          label="电子邮箱"
                          rules={[{ type: "email" }]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item name="phone" label="手机号码">
                          <Input />
                        </Form.Item>
                      </div>
                    </Form>
                    {isEditing && (
                      <div className="profile-form-actions">
                        <Button
                          type="primary"
                          icon={<SaveOutlined />}
                          onClick={handleSave}
                        >
                          保存更改
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                          取消
                        </Button>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                key: "security",
                label: (
                  <span className="profile-tab-label">
                    <SafetyCertificateOutlined />
                    <span>账号安全 & 绑定</span>
                  </span>
                ),
                children: (
                  <div className="profile-tabs-content">
                    <div className="profile-section-card">
                      <div className="section-row">
                        <div className="section-main">
                          <KeyOutlined />
                          <div className="section-text">
                            <div className="section-title">登录密码</div>
                            <div className="section-desc">
                              建议定期更换密码以保护账号安全
                            </div>
                          </div>
                        </div>
                        <Button type="default">修改</Button>
                      </div>
                    </div>

                    <div className="profile-section-card">
                      <div className="section-row">
                        <div className="section-main">
                          <SafetyCertificateOutlined className="icon-success" />
                          <div className="section-text">
                            <div className="section-title">
                              两步验证 <Tag color="green">已启用</Tag>
                            </div>
                            <div className="section-desc">
                              已绑定手机号 138****8888
                            </div>
                          </div>
                        </div>
                        <Button type="default">管理</Button>
                      </div>
                    </div>

                    <div className="profile-section-card">
                      <div className="section-header">
                        <LinkOutlined />
                        <span>第三方账号绑定</span>
                      </div>
                      <div className="section-body">
                        <div className="profile-section-card">
                          <div className="section-row">
                            <div className="section-main">
                              <div className="thirdparty-icon wechat">微</div>
                              <div className="section-text">
                                <div className="section-title-sm">微信</div>
                                <div className="section-desc">未绑定</div>
                              </div>
                            </div>
                            <Button type="primary" ghost>
                              立即绑定
                            </Button>
                          </div>
                        </div>

                        <div className="profile-section-card">
                          <div className="section-row">
                            <div className="section-main">
                              <div className="thirdparty-icon github">G</div>
                              <div className="section-text">
                                <div className="section-title-sm">
                                  GitHub{" "}
                                  <CheckCircleOutlined className="icon-success" />
                                </div>
                                <div className="section-desc">
                                  已绑定 zhangxiaoming
                                </div>
                              </div>
                            </div>
                            <Button>解除绑定</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
