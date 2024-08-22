'use client'
import AppLayout from "./Components/AntdLayout";
import styles from './page.module.css';

 type Stocks={
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
 }
const fetchStocks = async ({ queryKey, pageParam = 1 }: any) => {
    const searchTerm = queryKey[0];
    const response = await fetch(
      `https://api.polygon.io/v3/reference/tickers?active=true&limit=100&apiKey=m80GGEAZhoGpY_cQiHK1m5UPtNal04hK${pageParam}`
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
  
    const data = await response.json();
  
    if (data.Response === "False") {
      throw new Error(data.Error || "Unknown error occurred.");
    }
  
    return { ...data, page: pageParam };
  };
  
export default function Explore() {
    return (
    <AppLayout>
        <div>

        </div>
    </AppLayout>         
    );
  }