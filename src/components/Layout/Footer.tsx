import React from 'react';
import { Row, Col, Typography, Divider, Space, theme } from 'antd';
import type { FooterProps } from '../../types/layout';

const { Title, Text, Link } = Typography;
const { useToken } = theme;

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();
  const { token } = useToken();

  return (
    <footer style={{ background: token.colorBgContainer, borderTop: `1px solid ${token.colorBorderSecondary}`, padding: '32px 0 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Title level={5} style={{ color: '#e8385a' }}>Baby Chat</Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              Building amazing experiences with React, TypeScript, and Ant Design.
            </Text>
          </Col>

          <Col xs={24} md={8}>
            <Title level={5}>Quick Links</Title>
            <Space direction="vertical" size={4}>
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link key={item.href} href={item.href} style={{ fontSize: 13 }}>
                  {item.label}
                </Link>
              ))}
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <Title level={5}>Contact</Title>
            <Space direction="vertical" size={4}>
              <Text type="secondary" style={{ fontSize: 13 }}>Email: contact@yourapp.com</Text>
              <Text type="secondary" style={{ fontSize: 13 }}>Phone: +1 (555) 123-4567</Text>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: '24px 0 16px' }} />
        <div style={{ textAlign: 'center', paddingBottom: 16 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            © {currentYear} Baby Chat. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
