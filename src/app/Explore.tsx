'use client';
import React, { useRef, useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import { Layout, Input, Card, Col, Row, Result, Spin } from 'antd';
import Meta from 'antd/es/card/Meta';
import styles from './page.module.css';

// Define your types here
type Ticker = {
  ticker: string;               
  name: string;              
  market: string;               
  locale: string;                
  primary_exchange: string;      
  type: string;                 
  active: boolean;              
  currency_name: string;         
  cik: string;                  
  composite_figi: string;       
  share_class_figi: string;    
  last_updated_utc: string;
};

type TickerResponse = {
  results: Ticker[];
  status: string;
  count: number;
  request_id: string;
};

// Create a QueryClient instance
const queryClient = new QueryClient();

const fetchStocks = async ({ queryKey, pageParam = 1 }: any) => {
  const searchTerm = queryKey[0];
  
  const response = await fetch(
    `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=m80GGEAZhoGpY_cQiHK1m5UPtNal04hK&page=${pageParam}&search=${searchTerm}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }

  const data: TickerResponse = await response.json();

  if (data.status !== "OK") {
    throw new Error("Unknown error occurred.");
  }

  return { ...data, page: pageParam };
};

const AppLayout: React.FC<{ children: React.ReactNode; handleSearch: (value: string) => void }> = ({ children, handleSearch }) => {
  const { Header, Footer, Content } = Layout;

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
    padding: '24px',
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

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        {/* Add your Nav component or content here */}
      </Header>
      <Content style={contentStyle}>
        <Row justify="center">
          <Col span={24}>
            <Input.Search
              style={{ marginBottom: 16, maxWidth: '600px' }}
              placeholder="Search stocks..."
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
};

const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const listInnerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [searchTerm],
    queryFn: fetchStocks,
    getNextPageParam: (lastPage) => {
      const totalResults = lastPage.count || 0;
      const maxPages = Math.ceil(totalResults / 100);
      if (lastPage.page < maxPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!searchTerm,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value || "");
  };

  const renderPosts = () => {
    const allStocks = data?.pages.flatMap(page => page.results) || [];

    return (
      <Row gutter={16} style={{ padding: '16px' }}>
        {allStocks.map((stock, index) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={6} key={`${stock.ticker}-${index}`}>
            <Card
              hoverable
              style={{ width: 240, marginBottom: 16 }}
            >
              <Meta title={stock.name} description={stock.ticker} />
              <p>Market: {stock.market}</p>
              <p>Exchange: {stock.primary_exchange}</p>
            </Card>
          </Col>
        ))}
        {isFetchingNextPage && <Spin />}
      </Row>
    );
  };

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  };

  useEffect(() => {
    const ref = listInnerRef.current;
    if (ref) {
      ref.addEventListener('scroll', onScroll);
    }
    return () => {
      if (ref) {
        ref.removeEventListener('scroll', onScroll);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <AppLayout handleSearch={handleSearch}>
      <div
        ref={listInnerRef}
        style={{ height: "600px", overflow: "hidden" }} // Hide scrollbars
      >
        {isLoading ? (
          <Spin />
        ) : isError ? (
          <Result status="500" title={`Error: ${error.message}`} />
        ) : (data?.pages[0].results.length === 0) ? (
          <Result status="500" title="No Data" />
        ) : (
          renderPosts()
        )}
      </div>
    </AppLayout>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Explore />
    </QueryClientProvider>
  );
};

export default App;
