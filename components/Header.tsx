
import React from 'react';
import { Wallet, Activity, Zap, Search, Settings, BarChart2, Clock, Layers } from 'lucide-react';

interface HeaderProps {
  onConnect: () => void;
  isConnected: boolean;
  walletAddress?: string;
  currentView: string;
  onNavigate: (view: 'dashboard' | 'positions' | 'history' | 'analytics') => void;
}

export const Header: React.FC<HeaderProps> = ({ onConnect, isConnected, walletAddress, currentView, onNavigate }) => {
  
  const navItemClass = (view: string) => 
    `flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all ${
      currentView === view 
        ? 'text-brand-500 bg-brand-500/10 font-medium' 
        : 'text-gray-400 hover:text-white hover:bg-gray-800'
    }`;

  return (
    <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-500 to-white">
              ArbFlow
            </span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-2">
            <button onClick={() => onNavigate('dashboard')} className={navItemClass('dashboard')}>
              <Zap size={18} /> Dashboard
            </button>
            <button onClick={() => onNavigate('positions')} className={navItemClass('positions')}>
              <Layers size={18} /> Positions
            </button>
            <button onClick={() => onNavigate('history')} className={navItemClass('history')}>
              <Clock size={18} /> History
            </button>
            <button onClick={() => onNavigate('analytics')} className={navItemClass('analytics')}>
              <BarChart2 size={18} /> Analytics
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative group">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-brand-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-gray-900 border border-gray-700 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-brand-500 text-gray-300 w-32 transition-all focus:w-48 placeholder-gray-600"
              />
            </div>
            
            <button className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-full">
              <Settings size={20} />
            </button>

            <button
              onClick={onConnect}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all active:scale-95 ${
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
