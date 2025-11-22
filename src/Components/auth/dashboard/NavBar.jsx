import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Side - Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
              Stock<span className="text-gray-500">Master</span>
            </span>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              label="Dashboard" 
              onClick={() => navigate('/dashboard')} 
              active={true}
            />
            
            {/* Operations Dropdown */}
            <div className="relative">
              <button 
                onClick={() => toggleDropdown('operations')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition flex items-center gap-1"
              >
                Operations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'operations' && (
                <div className="absolute top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-2">
                  <DropdownItem label="Receipt" onClick={() => navigate('/operations/receipt')} />
                  <DropdownItem label="Delivery" onClick={() => navigate('/operations/delivery')} />
                  <DropdownItem label="Adjustment" onClick={() => navigate('/operations/adjustment')} />
                </div>
              )}
            </div>

            <NavLink label="Stock" onClick={() => navigate('/stock')} />
            <NavLink label="Move History" onClick={() => navigate('/move-history')} />
            <NavLink label="Settings" onClick={() => navigate('/settings')} />
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-bold cursor-pointer">
              JD
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sub-components
const NavLink = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
      active 
        ? 'bg-gray-900 text-white' 
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`}
  >
    {label}
  </button>
);

const DropdownItem = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition"
  >
    {label}
  </button>
);

export default Navbar;