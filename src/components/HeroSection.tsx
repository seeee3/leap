
import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex-1 flex items-center justify-between px-6 max-w-7xl mx-auto">
      <div className="flex-1 max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
          Intent to{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Action
          </span>
        </h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
          Transform your applications into chat-based interfaces effortlessly with our GenAI-driven tool—seamlessly generating and integrating code in minutes.
        </p>
      </div>
      
      <div className="flex-1 flex justify-end">
        <div className="relative w-96 h-96">
          {/* Main cube structure */}
          <div className="absolute inset-0 perspective-1000">
            <div className="cube-container transform-gpu">
              {/* Top face */}
              <div className="cube-face cube-top bg-gradient-to-br from-cyan-400 to-blue-500 opacity-80"></div>
              {/* Front face */}
              <div className="cube-face cube-front bg-gradient-to-br from-blue-500 to-purple-600 opacity-70"></div>
              {/* Right face */}
              <div className="cube-face cube-right bg-gradient-to-br from-purple-600 to-pink-500 opacity-60"></div>
            </div>
          </div>
          
          {/* Dotted pattern overlay */}
          <div className="absolute inset-0 dotted-pattern"></div>
          
          {/* Floating dots */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-10 right-10 w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
