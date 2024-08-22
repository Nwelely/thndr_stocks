'use client'
import React from 'react';
import styles from './page.module.css';
import AppLayout from './Components/AntdLayout';
import SplashScreen from './SplashScreen';

export default function Home() {
  return (
    <main className={styles.main}>
      
<SplashScreen/>
       
    </main>
  );
}
