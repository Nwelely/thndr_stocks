'use client';
import React from 'react';
import './Nav.css'; // Make sure you have the correct path

export default function Nav() {
    return (
        <nav className="navDiv">
            <img
                src="../../public/images/Logo.png" 
                alt="Logo"
                width={150} 
                className="logo" 
            />
        </nav>
    );
}
