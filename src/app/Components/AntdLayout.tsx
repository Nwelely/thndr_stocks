import React from 'react';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
 
 
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
 
  
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  
 
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ borderRadius: 8, overflow: 'hidden', width: 'calc(50% - 8px)', maxWidth: 'calc(50% - 8px)' }}>
      <Header style={headerStyle}></Header>
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Content style={contentStyle}>{children}</Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}
export { default as AppLayout } from './AntdLayout';