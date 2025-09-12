// src/components/Layout/Sidebar.tsx
import React from 'react';
import { SidebarProps, NavigationItem } from '../../types/layout';

const Sidebar: React.FC<SidebarProps> = ({ 
  className = '', 
  isOpen = false, 
  onToggle 
}) => {
  const sidebarItems: NavigationItem[] = [
    { id: '1', label: 'Dashboard', href: '/dashboard' },
    { id: '2', label: 'Profile', href: '/profile' },
    { id: '3', label: 'Settings', href: '/settings' },
    { id: '4', label: 'Analytics', href: '/analytics' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-30 h-screen w-64 bg-white shadow-lg border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          ${className}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-xl font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="ml-3 font-medium">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;