import React, { ReactNode } from 'react';
import { AppTab } from '../types';
import { Map, BarChart2, Gamepad2, Menu } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: AppTab.DASHBOARD, label: '분석 대시보드', icon: BarChart2 },
    { id: AppTab.PROPOSALS, label: '신규 콘텐츠 제안', icon: Map },
    { id: AppTab.GAME, label: '관광 퀴즈', icon: Gamepad2 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">Busan Trip 2.0</span>
            <span className="text-xs bg-blue-500 px-2 py-0.5 rounded-full hidden sm:inline-block">Strategy Ver 2.0</span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-white text-blue-600 font-medium shadow-sm' 
                    : 'text-blue-100 hover:bg-blue-500'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 px-4 py-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center w-full space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === item.id 
                    ? 'bg-white text-blue-600 font-medium' 
                    : 'text-blue-100 hover:bg-blue-600'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center text-sm">
        <p>© 2025 Busan Tourism Organization & Gemini Analysis Team</p>
        <p className="mt-1">Based on Youtube Comments Analysis & Strategic Planning</p>
      </footer>
    </div>
  );
};

export default Layout;
