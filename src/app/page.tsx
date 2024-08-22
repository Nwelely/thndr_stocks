'use client';
import React, { useEffect, useState } from 'react';
import AppLayout from './Components/AntdLayout';
import SplashScreen from './SplashScreen';
import Explore from './Explore';
import styles from './page.module.css';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
  <div>
      {showSplash ? <SplashScreen /> : <Explore />}
      </div>
  );
}
