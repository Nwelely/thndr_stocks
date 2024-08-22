'use client';
import React from 'react';
import { Layout, Input, Card, Col, Row } from 'antd';
import Nav from './Nav';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#0958d9',
  padding: '24px', // Adjust padding as needed
  flex: 1, // Allows content to fill the available space
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'black',
  backgroundColor: 'white',
  padding: '1rem',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for visibility
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Ensures the layout covers the full viewport height
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Nav />
      </Header>
      <Content style={contentStyle}>
        <Row justify="center">
          <Col span={24}>
            <Search
              style={{ marginBottom: 16, maxWidth: '600px' }} // Adjust maxWidth as needed
              placeholder="Search movies..."
              allowClear
              enterButton="Search"
              size="large"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} xl={6}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
        {children}
      </Content>
      <Footer style={footerStyle}>
        Footer
      </Footer>
    </Layout>
  );
}
