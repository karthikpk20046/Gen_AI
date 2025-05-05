import React from 'react';
import { ClipboardCheckIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-[#0F4C81] to-[#00A3A1] text-white shadow-md">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ClipboardCheckIcon size={32} className="text-[#E8B71A]" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SHL Assessment Finder</h1>
            <p className="text-sm opacity-80">Intelligent recommendations for hiring managers</p>
          </div>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-[#E8B71A] transition-colors duration-200">Home</a>
          <a href="#" className="text-white hover:text-[#E8B71A] transition-colors duration-200">About</a>
          <a href="#" className="text-white hover:text-[#E8B71A] transition-colors duration-200">Help</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;