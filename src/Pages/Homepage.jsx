import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-900 selection:text-white font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
              <span className="text-2xl font-bold tracking-tighter text-gray-900">
                Stock<span className="text-gray-500">Master</span>
              </span>
            </div>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#workflow" className="text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-md text-sm font-medium">Workflow</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/signin')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-lg text-sm font-bold transition transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gray-200/50 blur-[120px] rounded-full pointer-events-none" />

          <div className="text-center relative z-10">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
              Inventory Management, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500">
                Reimagined.
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Track receipts, deliveries, and internal transfers across multiple warehouses. 
              Real-time KPIs and movement ledgers for total control.
            </p>
            
            <div className="mt-10 flex justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition shadow-lg"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => navigate('/signin')}
                className="px-8 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-50 transition"
              >
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Everything you need to run operations</h2>
            <p className="mt-4 text-gray-600">From procurement to delivery, we handle the logic.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Dashboard & KPIs" 
              desc="Visualize Total Stock, Low Stock alerts, and Pending Deliveries instantly upon login."
              icon={<ChartIcon />}
            />
            <FeatureCard 
              title="Multi-Warehouse" 
              desc="Manage multiple locations. Track internal transfers from rack to rack with precision."
              icon={<WarehouseIcon />}
            />
            <FeatureCard 
              title="Smart Operations" 
              desc="Streamline Incoming Receipts, Outgoing Deliveries, and Stock Adjustments effortlessly."
              icon={<TruckIcon />}
            />
            <FeatureCard 
              title="Product Catalog" 
              desc="Organize by SKU, Category, and Unit of Measure. Set automatic reordering rules."
              icon={<BoxIcon />}
            />
            <FeatureCard 
              title="Movement Ledger" 
              desc="A complete audit trail. Who moved what, when, and where. Full transparency."
              icon={<ListIcon />}
            />
            <FeatureCard 
              title="Secure Access" 
              desc="Role-based authentication with OTP resets ensuring your data stays safe."
              icon={<LockIcon />}
            />
          </div>
        </div>
      </section>

      {/* --- WORKFLOW STEPS --- */}
      <section id="workflow" className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-gray-700 font-semibold tracking-wide uppercase">Workflow</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How StockMaster works
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <Step number="01" title="Receive Goods" desc="Log incoming receipts from vendors. Stock increases automatically." />
              <Step number="02" title="Organize" desc="Transfer items internally between warehouses or specific racks." />
              <Step number="03" title="Fulfill" desc="Create delivery orders for customers. Stock is deducted upon validation." />
              <Step number="04" title="Track" desc="Monitor the Movement Ledger for every single action taken." />
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Ready to take control?
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Join thousands of managers using StockMaster today.
          </p>
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:py-4 md:text-lg md:px-10 transition shadow-lg"
            >
              Get Started Now
            </button>
          </div>
          <p className="mt-8 text-center text-base text-gray-500">
            &copy; 2024 StockMaster System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const FeatureCard = ({ title, desc, icon }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 hover:shadow-lg transition duration-300 group">
    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-900 group-hover:text-white transition duration-300 text-gray-700">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed text-sm">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="relative bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
    <div className="text-4xl font-black text-gray-200 mb-4">{number}</div>
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className="mt-2 text-sm text-gray-600">{desc}</p>
  </div>
);

/* --- SVG ICONS --- */
const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const WarehouseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);
const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);
const BoxIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);
const ListIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default LandingPage;