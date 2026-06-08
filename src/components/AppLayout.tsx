'use client';

import React, { useState } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Avatar, Switch } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { useAppTheme } from './ThemeProvider';

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useAppTheme();

  const {
    token: { colorBgContainer, borderRadiusLG, colorText, colorBorderSecondary },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '대시보드',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: '고객 관리',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme={isDarkMode ? 'dark' : 'light'}
        style={{
          borderRight: `1px solid ${colorBorderSecondary}`,
        }}
      >
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colorText,
          fontWeight: 'bold',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          borderRadius: '6px',
        }}>
          {collapsed ? 'ADM' : 'ADMIN DASH'}
        </div>
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 24px 0 0', 
          background: colorBgContainer, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: `1px solid ${colorBorderSecondary}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
                color: colorText,
              }}
            />
            <h3 style={{ margin: 0, color: colorText }}>포트폴리오 대시보드</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Switch
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span style={{ fontWeight: '500', color: colorText }}>홍길동 님</span>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
