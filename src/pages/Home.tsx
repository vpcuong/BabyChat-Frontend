import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Row, Col, Card, Space } from 'antd';
import { MessageSquareText, Users, ShieldCheck, Zap } from 'lucide-react';
import { useThemeToken } from '../hooks/useThemeToken';

const { Title, Paragraph, Text } = Typography;

const featureIcons = [Zap, Users, ShieldCheck, MessageSquareText];
const featureDefs = [
  { title: 'Instant Messaging',  description: 'Connect in real-time with our blazing-fast messaging infrastructure. No delays, just conversation.' },
  { title: 'Group Chats',        description: 'Create groups for your friends, family, or team. Stay connected with everyone in one place.' },
  { title: 'Secure & Private',   description: 'Your conversations are yours. With end-to-end encryption, your privacy is our top priority.' },
  { title: 'Rich Communication', description: 'Express yourself fully with support for emojis, GIFs, and file sharing. Make every chat lively.' },
];

const HomePage: React.FC = () => {
  const token = useThemeToken();
  const features = featureDefs.map((f, i) => ({
    ...f,
    icon: React.createElement(featureIcons[i], { size: 32, color: token.colorPrimary }),
  }));

  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '80px 0 60px', textAlign: 'center' }}>
        <Title style={{ fontSize: 52, lineHeight: 1.15 }}>
          Connect Instantly,{' '}
          <Text style={{ color: token.colorPrimary, fontSize: 'inherit' }}>Chat Seamlessly.</Text>
        </Title>
        <Paragraph style={{ fontSize: 18, maxWidth: 600, margin: '16px auto 32px', color: token.colorTextSecondary }}>
          Welcome to Baby Chat, the simple, fast, and secure way to stay in touch with the people who matter most.
        </Paragraph>
        <Space size={16} wrap>
          <Link to="/messages">
            <Button type="primary" size="large" shape="round" style={{ minWidth: 140 }}>
              Start Chatting
            </Button>
          </Link>
          <Link to="/about">
            <Button size="large" shape="round" style={{ minWidth: 140 }}>
              Learn More
            </Button>
          </Link>
        </Space>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0', background: 'rgba(0,0,0,0.02)', borderRadius: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>Everything You Need to Connect</Title>
          <Paragraph style={{ color: token.colorTextSecondary }}>
            A feature-rich experience designed for modern communication.
          </Paragraph>
        </div>
        <Row gutter={[24, 24]}>
          {features.map((feature) => (
            <Col key={feature.title} xs={24} sm={12} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%' }}>
                <div style={{ marginBottom: 16 }}>{feature.icon}</div>
                <Title level={5}>{feature.title}</Title>
                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <Title level={2}>Ready to Join the Conversation?</Title>
        <Paragraph style={{ fontSize: 16, color: token.colorTextSecondary, maxWidth: 480, margin: '12px auto 32px' }}>
          Create an account in seconds and start connecting with your world today. It's free!
        </Paragraph>
        <Link to="/signup">
          <Button type="primary" size="large" shape="round" style={{ minWidth: 160 }}>
            Sign Up Now
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
