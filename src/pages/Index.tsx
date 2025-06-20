
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-navy-900 relative overflow-hidden">
      {/* Background geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <HeroSection />
      </div>
    </div>
  );
};

export default Index;
