import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MenuIcon, SunIcon, MoonIcon } from '../icons';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6 fill-current" />
            </button>
          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition duration-150"
            >
              <span className="sr-only">Switch to {theme === 'dark' ? 'light' : 'dark'} mode</span>
              {theme === 'dark' ? <SunIcon className="w-4 h-4 text-yellow-400"/> : <MoonIcon className="w-4 h-4 text-gray-700" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
