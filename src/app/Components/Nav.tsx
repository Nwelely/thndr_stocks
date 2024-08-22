'use client';

import React from 'react';
import Image from 'next/image'; 
import './Nav.css';  

export default function Nav() {
    return (
        <nav className="navDiv">
      <Image
        src="/images/Logo.png"
        alt="Logo"
        width={150} 
        height={50} 
        className="logo"       />
      
    </nav>
    );
}