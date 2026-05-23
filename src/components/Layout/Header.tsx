import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Typography, Space, theme, Grid } from 'antd';
import { SunOutlined, MoonOutlined, UserOutlined, SettingOutlined, LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { HeaderProps } from '../../types/layout';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const navItems: MenuProps['items'] = [
  { key: '/',         label: <a href="/">Home</a> },
  { key: '/about',    label: <a href="/about">About</a> },
  { key: '/services', label: <a href="/services">Services</a> },
  { key: '/contact',  label: <a href="/contact">Contact</a> },
  { key: '/messages', label: <a href="/messages">Chat</a> },
];

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMd = !!screens.md;
  const { token } = useToken();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (!saved && prefersDark);
    setIsDarkMode(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const currentUser = {
    name:   localStorage.getItem('username') || 'John Doe',
    email:  localStorage.getItem('email')    || 'user@example.com',
    avatar: 'https://i.pravatar.cc/150',
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'info',
      label: (
        <div style={{ padding: '4px 0' }}>
          <div style={{ fontWeight: 600 }}>{currentUser.name}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{currentUser.email}</Text>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    { key: 'profile',  icon: <UserOutlined />,   label: <a href="/profile">Profile</a> },
    { key: 'settings', icon: <SettingOutlined />, label: <a href="/settings">Settings</a> },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Sign out', danger: true, onClick: logOut },
  ];

  return (
    <>
      <AntHeader
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 64,
          background: token.colorBgContainer,
          boxShadow: `0 1px 4px ${token.colorFillSecondary}`,
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        {/* Logo */}
        <Typography.Title level={4} style={{ margin: 0, color: '#e8385a', flexShrink: 0 }}>
          Baby Chat
        </Typography.Title>

        {/* Desktop nav */}
        {isMd && (
          <Menu
            mode="horizontal"
            items={navItems}
            selectedKeys={[window.location.pathname]}
            style={{ flex: 1, marginLeft: 32, border: 'none', background: 'transparent', minWidth: 0 }}
          />
        )}

        <Space size={8} style={{ flexShrink: 0 }}>
          <Button
            type="text"
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          />

          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <Space style={{ cursor: 'pointer' }}>
              <Avatar src={currentUser.avatar} size={32} style={{ border: '2px solid #e8385a' }} />
              {isMd && <Text style={{ fontWeight: 500 }}>{currentUser.name}</Text>}
            </Space>
          </Dropdown>

          {!isMd && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Open menu"
            />
          )}
        </Space>
      </AntHeader>

      {/* Mobile nav dropdown */}
      {!isMd && mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 64,
          left: 0,
          right: 0,
          background: token.colorBgContainer,
          boxShadow: token.boxShadowSecondary,
          zIndex: 99,
        }}>
          <Menu
            mode="inline"
            items={navItems}
            selectedKeys={[window.location.pathname]}
            style={{ border: 'none' }}
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default Header;
