import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
    DashboardIcon, ServiceIcon, PortfolioIcon, TestimonialIcon, FinancialsIcon, 
    ContactsIcon, SettingsIcon, MotionIcon, CloseIcon 
} from '../icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });
  
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const linkClasses = (path: string) => 
    `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 ${
      pathname.includes(path) 
      ? 'bg-indigo-600 text-white' 
      : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <div
      className={`absolute inset-y-0 left-0 z-40 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div ref={sidebar} className="flex h-full flex-col overflow-y-auto bg-gray-800 p-4">
        <div className="flex items-center justify-between mb-8">
            <NavLink to="/admin/dashboard" className="flex items-center gap-2 text-white text-xl font-bold">
               <MotionIcon className="h-8 w-8 text-indigo-400" />
               Creative Motion
            </NavLink>
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <CloseIcon />
          </button>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavLink to="/admin/dashboard" className={linkClasses('/admin/dashboard')}>
            <DashboardIcon /> Dashboard
          </NavLink>
          <NavLink to="/admin/services" className={linkClasses('/admin/services')}>
            <ServiceIcon /> Services
          </NavLink>
          <NavLink to="/admin/portfolio" className={linkClasses('/admin/portfolio')}>
            <PortfolioIcon /> Portfolio
          </NavLink>
          <NavLink to="/admin/testimonials" className={linkClasses('/admin/testimonials')}>
            <TestimonialIcon /> Testimonials
          </NavLink>
          <NavLink to="/admin/financials" className={linkClasses('/admin/financials')}>
            <FinancialsIcon /> Financials
          </NavLink>
          <NavLink to="/admin/contacts" className={linkClasses('/admin/contacts')}>
            <ContactsIcon /> Contacts
          </NavLink>
        </nav>
        
        <div className="mt-auto">
          <NavLink to="/admin/settings" className={linkClasses('/admin/settings')}>
            <SettingsIcon /> Settings
          </NavLink>
           <NavLink to="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors duration-200 mt-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Site
          </NavLink>
        </div>
      </div>
    </div>
  