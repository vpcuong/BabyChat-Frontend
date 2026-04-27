import React, { type JSX } from 'react';
import { Typography, Row, Col, Card, List, Button, Space, Tag } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { MessageSquare, Video, Phone, Cloud, Lock, Headphones } from 'lucide-react';

const { Title, Paragraph, Text } = Typography;

interface ServiceFeature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const services: ServiceFeature[] = [
  { icon: <MessageSquare size={32} color="#e8385a" />, title: 'Text Messaging',    description: 'Send instant messages with emoji support and file sharing capabilities.' },
  { icon: <Video         size={32} color="#e8385a" />, title: 'Video Calls',       description: 'Crystal clear video calls with up to 8 participants simultaneously.' },
  { icon: <Phone         size={32} color="#e8385a" />, title: 'Voice Calls',       description: 'High-quality voice calls with noise cancellation technology.' },
  { icon: <Cloud         size={32} color="#e8385a" />, title: 'Cloud Storage',     description: 'Secure cloud storage for your messages and shared files.' },
  { icon: <Lock          size={32} color="#e8385a" />, title: 'Enhanced Security', description: 'End-to-end encryption and two-factor authentication.' },
  { icon: <Headphones    size={32} color="#e8385a" />, title: '24/7 Support',      description: 'Round-the-clock customer support for all your needs.' },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for personal use',
    features: ['Unlimited text messaging', 'Basic file sharing', 'Group chats up to 10 people', '1GB cloud storage', 'Standard support'],
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    description: 'Great for small teams',
    highlighted: true,
    features: ['Everything in Basic', 'Video calls up to 8 people', 'Group chats up to 50 people', '10GB cloud storage', 'Priority support', 'Custom emojis'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: ['Everything in Pro', 'Unlimited video calls', 'Unlimited group size', 'Custom storage options', '24/7 dedicated support', 'Admin dashboard', 'Custom integration'],
  },
];

const ServicePage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '64px 0 48px', textAlign: 'center' }}>
        <Title>Our Services</Title>
        <Paragraph style={{ fontSize: 18, color: '#6b7280', maxWidth: 720, margin: '0 auto' }}>
          Discover the full range of communication tools and services designed to keep you connected with the world.
        </Paragraph>
      </section>

      {/* Services Grid */}
      <section style={{ marginBottom: 64 }}>
        <Row gutter={[24, 24]}>
          {services.map((s) => (
            <Col key={s.title} xs={24} md={12} lg={8}>
              <Card hoverable style={{ height: '100%' }}>
                <Space align="start">
                  <div style={{ marginTop: 4 }}>{s.icon}</div>
                  <div>
                    <Title level={5} style={{ marginBottom: 4 }}>{s.title}</Title>
                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>{s.description}</Paragraph>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Pricing */}
      <section style={{ padding: '48px 32px', background: 'rgba(0,0,0,0.02)', borderRadius: 16, marginBottom: 64 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>Choose Your Plan</Title>
        <Row gutter={[24, 24]} align="middle">
          {pricingPlans.map((plan) => (
            <Col key={plan.name} xs={24} md={8}>
              <Card
                style={{
                  textAlign: 'center',
                  background: plan.highlighted ? '#e8385a' : undefined,
                  transform: plan.highlighted ? 'scale(1.04)' : undefined,
                  boxShadow: plan.highlighted ? '0 8px 32px rgba(232,56,90,0.3)' : undefined,
                  height: '100%',
                }}
                styles={{ body: { padding: 32 } }}
              >
                {plan.highlighted && <Tag color="gold" style={{ marginBottom: 12 }}>Most Popular</Tag>}
                <Title level={3} style={{ color: plan.highlighted ? '#fff' : undefined, marginBottom: 4 }}>
                  {plan.name}
                </Title>
                <Title level={2} style={{ color: plan.highlighted ? '#fff' : '#e8385a', margin: '8px 0' }}>
                  {plan.price}
                </Title>
                <Text style={{ color: plan.highlighted ? 'rgba(255,255,255,0.85)' : '#6b7280' }}>
                  {plan.description}
                </Text>
                <List
                  style={{ marginTop: 24, textAlign: 'left' }}
                  dataSource={plan.features}
                  renderItem={(f) => (
                    <List.Item style={{ padding: '6px 0', border: 'none' }}>
                      <Space>
                        <CheckOutlined style={{ color: plan.highlighted ? '#fff' : '#e8385a' }} />
                        <Text style={{ color: plan.highlighted ? '#fff' : undefined }}>{f}</Text>
                      </Space>
                    </List.Item>
                  )}
                />
                <Button
                  size="large"
                  shape="round"
                  block
                  style={{
                    marginTop: 24,
                    ...(plan.highlighted
                      ? { background: '#fff', color: '#e8385a', borderColor: '#fff' }
                      : {}),
                  }}
                  type={plan.highlighted ? 'default' : 'primary'}
                >
                  Get Started
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '48px 0 32px' }}>
        <Title level={2}>Need Custom Solutions?</Title>
        <Paragraph style={{ fontSize: 16, color: '#6b7280', maxWidth: 560, margin: '12px auto 32px' }}>
          Contact our sales team to discuss custom enterprise solutions tailored to your organization's needs.
        </Paragraph>
        <Button type="primary" size="large" shape="round" style={{ minWidth: 160 }}>
          Contact Sales
        </Button>
      </section>
    </div>
  );
};

export default ServicePage;
