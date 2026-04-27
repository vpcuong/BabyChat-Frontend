import React, { type JSX } from 'react';
import { Typography, Row, Col, Card, Statistic, Button, Space, Divider } from 'antd';
import { MessageSquare, Shield, Zap, Users, Globe, Heart } from 'lucide-react';

const { Title, Paragraph } = Typography;

interface FeatureCard {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  { icon: <MessageSquare size={24} color="#e8385a" />, title: 'Instant Messaging',     description: 'Real-time messaging with friends and family across any device.' },
  { icon: <Shield      size={24} color="#e8385a" />, title: 'Secure Communication', description: 'End-to-end encryption ensures your conversations stay private.' },
  { icon: <Users       size={24} color="#e8385a" />, title: 'Group Chats',           description: 'Create groups for family, friends, or team collaboration.' },
  { icon: <Globe       size={24} color="#e8385a" />, title: 'Cross-Platform',        description: 'Available on web, mobile, and desktop platforms.' },
  { icon: <Zap         size={24} color="#e8385a" />, title: 'Lightning Fast',        description: 'Optimized for speed and reliability.' },
  { icon: <Heart       size={24} color="#e8385a" />, title: 'User-Friendly',         description: 'Intuitive interface designed for everyone.' },
];

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', textAlign: 'center' }}>
        <Title>About Baby Chat</Title>
        <Paragraph style={{ fontSize: 18, color: '#6b7280', maxWidth: 720, margin: '0 auto' }}>
          Baby Chat is a modern messaging platform designed to bring people closer together through seamless
          communication. We believe in making conversations more meaningful, secure, and accessible to everyone.
        </Paragraph>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '48px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
          Why Choose Baby Chat?
        </Title>
        <Row gutter={[24, 24]}>
          {features.map((f) => (
            <Col key={f.title} xs={24} md={12} lg={8}>
              <Card hoverable style={{ height: '100%' }}>
                <Space align="start">
                  <div style={{ marginTop: 2 }}>{f.icon}</div>
                  <div>
                    <Title level={5} style={{ marginBottom: 4 }}>{f.title}</Title>
                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>{f.description}</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Mission */}
      <section style={{ padding: '48px 0', textAlign: 'center' }}>
        <Title level={2}>Our Mission</Title>
        <Paragraph style={{ fontSize: 16, color: '#6b7280', maxWidth: 720, margin: '0 auto 40px' }}>
          We're on a mission to transform how people connect and communicate in the digital age. By providing a
          secure, fast, and intuitive messaging platform, we're making it easier for everyone to stay connected
          with the people who matter most.
        </Paragraph>
        <Row justify="center" gutter={[48, 24]}>
          <Col><Statistic title="Active Users" value="1M+" valueStyle={{ color: '#e8385a' }} /></Col>
          <Col><Statistic title="Countries"    value="150+"  valueStyle={{ color: '#e8385a' }} /></Col>
          <Col><Statistic title="Support"      value="24/7"  valueStyle={{ color: '#e8385a' }} /></Col>
        </Row>
      </section>

      <Divider />

      {/* CTA */}
      <section style={{ padding: '48px 0', textAlign: 'center', background: '#e8385a', borderRadius: 16, marginBottom: 32 }}>
        <Title level={2} style={{ color: '#fff', marginBottom: 12 }}>Ready to Get Started?</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, marginBottom: 32 }}>
          Join millions of users already enjoying Baby Chat's secure messaging platform.
        </Paragraph>
        <Button size="large" shape="round" style={{ background: '#fff', color: '#e8385a', borderColor: '#fff', minWidth: 160 }}>
          Create Account
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;
