import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '../../public/images/Logo.png'; 
import styles from './SplashScreen.module.css'; 
import {Spin } from "antd"


export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.splashScreen}>
      <Image
        src={logo}
        alt="Logo"
        
      />
      <h1 className={styles.name}>By: Nour El Welely</h1>

      <div style={{ fontSize: '40px' }}>
  <Spin />
</div>
    </div>
  );
}
