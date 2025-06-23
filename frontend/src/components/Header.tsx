
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between relative z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded opacity-80"></div>
          <div className="absolute inset-0.5 bg-slate-900 rounded"></div>
          <div className="absolute inset-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded opacity-60"></div>
        </div>
        <span className="text-white font-bold text-xl tracking-tight">
          MTX<br />CUBE
        </span>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="text-slate-300 hover:text-white transition-colors">Features</a>
        <a href="#" className="text-slate-300 hover:text-white transition-colors">How it Works?</a>
        <a href="#" className="text-slate-300 hover:text-white transition-colors">Docs</a>
      </nav>
      
      <div className="flex items-center space-x-4">
        <button className="text-slate-300 hover:text-white transition-colors">
          Sign In
        </button>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
          Book a Demo →
        </Button>
      </div>
    </header>
  );
};

export default Header;
