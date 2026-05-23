import React from 'react';
import { Drawer, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined, BarChartOutlined } from '@ant-design/icons';
import type { SidebarProps } from '../../types/layout';

const menuItems = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: <a href="/dashboard">Dashboard</a> },
  { key: '/profile',   icon: <UserOutlined />,      label: <a href="/profile">Profile</a> },
  { key: '/settings',  icon: <SettingOutlined />,   label: <a href="/settings">Settings</a> },
  { key: '/analytics', icon: <BarChartOutlined />,  label: <a href="/analytics">Analytics</a> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onToggle }) => {
  return (
    <Drawer
      title="Menu"
      placement="left"
      open={isOpen}
      onClose={onToggle}
      width={256}
      styles={{ body: { padding: 0 } }}
    >
      <Menu
        mode="inline"
        items={menuItems}
        selectedKeys={[window.location.pathname]}
        style={{ border: 'none', height: '100%' }}
      />
    </Drawer>
  );
};

export default Sidebar;
