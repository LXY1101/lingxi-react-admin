import { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './index.module.scss';

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // 如果已登录，重定向到管理后台
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    const success = await login(values.username, values.password);
    setLoading(false);

    if (success) {
      messageApi.success('登录成功！');
      navigate('/admin/dashboard', { replace: true });
    } else {
      messageApi.error('用户名或密码错误！');
    }
  };

  return (
    <div className={styles["login-page"]}>
      {contextHolder}
      <div className={styles["login-background"]}>
        <div className={styles["login-background-pattern"]}></div>
      </div>
      <Card className={styles["login-card"]}>
        <div className={styles["login-header"]}>
          <div className={styles["login-logo"]}>
            <LoginOutlined />
          </div>
          <h1 className={styles["login-title"]}>欢迎回来</h1>
          <p className={styles["login-subtitle"]}>请登录您的账户</p>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="middle"
          className={styles["login-form"]}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
              className={styles["login-input"]}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码至少6位！' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              className={styles["login-input"]}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-button"]}
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className={styles["login-footer"]}>
          <p>提示：用户名任意，密码至少6位</p>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
