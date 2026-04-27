import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Divider, Alert, Typography, Card, Space, Row, Col } from 'antd';
import { MailOutlined, LockOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import apiClient from '../src/api/apiClient';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form] = Form.useForm<LoginFormData>();

  const handleSubmit = async (values: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem('username',      data.user.username);
      localStorage.setItem('email',         data.user.email);
      localStorage.setItem('access_token',  data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      navigate('/');
    } catch (err: unknown) {
      const msg = (err as any)?.response?.data?.message;
      setError(`Invalid credentials. Please try again!${msg ? `\n${msg}` : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(`Logging in with ${provider}`);
    } catch {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
      <Card style={{ width: '100%', maxWidth: 440, borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ marginBottom: 4 }}>Welcome Back</Title>
          <Text type="secondary">Sign in to continue to Baby Chat</Text>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            showIcon
            style={{ marginBottom: 20, whiteSpace: 'pre-line' }}
            closable
            onClose={() => setError(null)}
          />
        )}

        <Form form={form} layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email',  message: 'Invalid email address' },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#9ca3af' }} />}
              placeholder="Email address"
              size="large"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Password is required' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#9ca3af' }} />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Row justify="space-between" align="middle">
              <Col>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
              <Col>
                <Link to="/forgot-password">Forgot password?</Link>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={isLoading}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Divider plain>Or continue with</Divider>

        <Space style={{ width: '100%' }} direction="vertical" size={12}>
          <Button
            icon={<GoogleOutlined style={{ color: '#ea4335' }} />}
            size="large"
            block
            onClick={() => handleSocialLogin('google')}
            loading={isLoading}
          >
            Google
          </Button>
          <Button
            icon={<FacebookOutlined style={{ color: '#1877f2' }} />}
            size="large"
            block
            onClick={() => handleSocialLogin('facebook')}
            loading={isLoading}
          >
            Facebook
          </Button>
        </Space>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Text type="secondary">Don't have an account? </Text>
          <Link to="/signup">Sign up</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
