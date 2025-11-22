import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    // Clear auth token/session here if needed
    // localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side - Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className="text-2xl font-black tracking-tighter text-gray-900">
              Invent<span className="text-gray-500">ree</span>
            </span>
          </motion.div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-1" ref={dropdownRef}>
            <NavLink label="Dashboard" onClick={() => navigate('/dashboard')} />
            
            {/* Operations Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('operations')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition flex items-center gap-1 ${activeDropdown === 'operations' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                Operations
                <motion.svg 
                  animate={{ rotate: activeDropdown === 'operations' ? 180 : 0 }}
                  className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'operations' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 overflow-hidden left-0"
                  >
                    <DropdownItem label="Receipt" onClick={() => { navigate('/receipts'); setActiveDropdown(null); }} />
                    <DropdownItem label="Delivery" onClick={() => { navigate('/delivery'); setActiveDropdown(null); }} />
                    <DropdownItem label="Adjustment" onClick={() => { navigate('/adjustment'); setActiveDropdown(null); }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink label="Stock" onClick={() => navigate('/stock')} />
            <NavLink label="Move History" onClick={() => navigate('/move-history')} />
            <NavLink label="Settings" onClick={() => navigate('/settings')} />
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4" ref={dropdownRef}>
            <button className="text-gray-500 hover:text-gray-900 transition p-2 hover:bg-gray-100 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleDropdown('profile')}
                className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white text-xs font-bold cursor-pointer border-2 border-white shadow-md hover:shadow-lg transition-all"
              >
                JD
              </motion.div>

              <AnimatePresence>
                {activeDropdown === 'profile' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 overflow-hidden origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 mb-1">
                      <p className="text-sm font-bold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                    </div>
                    
                    
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-3"
                    >
                      <LogoutIcon />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sub-components
const NavLink = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
  >
    {label}
  </button>
);

const DropdownItem = ({ label, onClick, icon }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition flex items-center gap-3"
  >
    {icon}
    {label}
  </button>
);

// Icons
const UserIcon = () => <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const SettingsIcon = () => <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export default Navbar;