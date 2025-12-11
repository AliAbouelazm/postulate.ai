import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';

export function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="w-full min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
    </div>;
}