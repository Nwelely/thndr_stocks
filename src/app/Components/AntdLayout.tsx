'use client';
import React from 'react';
import { Layout, Input, Row, Col } from 'antd';
import Nav from './Nav';

const { Header, Footer, Content } = Layout;
const { Search } = Input;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  lineHeight: '64px',
  backgroundColor: '#001529',
};


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'grey',
 paddingTop: '24px',
 paddingBottom: '15px',
  flex: 1,
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'black',
  backgroundColor: 'white',
  padding: '1rem',
  boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', 
};

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', 
};

interface AppLayoutProps {
  children: React.ReactNode;
  handleSearch: (value: string) => void;
}

export default function AppLayout({ children, handleSearch }: AppLayoutProps) {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Nav />
      </Header>
      <Content style={contentStyle}>
        <Row justify="center">
          <Col span={24}>
            <Search
              style={{ marginBottom: 16, maxWidth: '600px', 
                borderRadius: '20px',
              }} 
              placeholder="Search movies..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={handleSearch}
            />
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
