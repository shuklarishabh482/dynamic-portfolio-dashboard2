"use client";  
// This tells Next.js that this file uses React hooks and should be treated as a client component

import '../styles/globals.css';  // Global CSS 
import { useEffect } from 'react';

export default function Layout({ children }) {

  useEffect(() => {
  
    console.log("Layout loaded");
  }, []);

  return (
    <div>
      {/* Global Header */}
      <header className="bg-blue-600 p-4 text-white">
        <h1>Portfolio Dashboard</h1>
      </header>

      {/* Main content area */}
      <main>{children}</main>

      {/* Global Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2025 Octa Byte AI Pvt Ltd</p>
      </footer>
    </div>
  );
}