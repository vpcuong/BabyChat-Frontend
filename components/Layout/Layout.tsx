// src/components/Layout/Layout.tsx
import React, { useState } from 'react';
import type { LayoutProps } from '../../types/layout';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const Layout: React.FC<LayoutProps> = ({
  children,
  className = '',
  showHeader = true,
  showFooter = true,
  showSidebar = false,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      {showHeader && <Header />}
      
      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onToggle={toggleSidebar}
          />
        )}
        
        <main className={`flex-1 ${showSidebar ? 'lg:ml-64' : ''}`}>
          {/* Sidebar toggle button for mobile */}
          {showSidebar && (
            <div className="lg:hidden p-4">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;