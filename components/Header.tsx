import React, { useState } from 'react';
import { Wallet, Activity, Zap, Search, Settings } from 'lucide-react';

interface HeaderProps {
  onConnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

export const Header: React.FC<HeaderProps> = ({ onConnect, isConnected, walletAddress }) => {
  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white">
              ArbFlow
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white font-medium hover:text-brand-500 transition-colors flex items-center gap-1">
              <Zap size={16} /> Dashboard
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Positions</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">History</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Analytics</a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search Pair..." 
                className="bg-gray-900 border border-gray-700 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-brand-500 text-gray-300 w-40 transition-all focus:w-64"
              />
            </div>
            
            <button className="text-gray-400 hover:text-white">
              <Settings size={20} />
            </button>

            <button
              onClick={onConnect}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                isConnected 
                  ? 'bg-gray-800 text-brand-500 border border-brand-500/30' 
                  : 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/20'
              }`}
            >
              <Wallet size={16} />
              {isConnected ? walletAddress : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
