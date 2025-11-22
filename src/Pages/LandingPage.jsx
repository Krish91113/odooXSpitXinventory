import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div
              className="text-2xl font-bold tracking-tight cursor-pointer"
              onClick={() => navigate("/")}
            >
              Stock<span className="text-gray-500">Master</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Features</a>
              <a href="#workflow" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Workflow</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Pricing</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/signin")}
                className="text-gray-700 hover:text-gray-900 text-sm font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition shadow-lg hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-x-0 top-[-50px] mx-auto w-[900px] h-[500px] bg-gray-200/50 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900">
            Inventory Management,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-500">
              Made Effortless.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Track incoming stock, outgoing deliveries, and warehouse movement—all in one simple dashboard.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl hover:bg-gray-800 shadow-lg transition"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="px-8 py-4 bg-white border-2 border-gray-900 text-lg font-bold rounded-xl hover:bg-gray-50 transition"
            >
              Live Demo
            </button>
          </div>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Powerful Tools for Modern Inventory Teams</h2>
            <p className="mt-4 text-gray-600">Everything you need to stay in control.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Smart Dashboard"
              desc="View stock levels, low-stock alerts, and daily operations instantly when you log in."
              icon={<ChartIcon />}
            />
            <FeatureCard
              title="Multi-Warehouse"
              desc="Manage multiple locations with ease. Track stock across racks, shelves, and zones."
              icon={<WarehouseIcon />}
            />
            <FeatureCard
              title="Automated Operations"
              desc="Receipts, deliveries, and internal transfers update stock in real-time."
              icon={<TruckIcon />}
            />
            <FeatureCard
              title="Product Catalog"
              desc="Organize SKUs, set reordering rules, UOMs, and custom product categories."
              icon={<BoxIcon />}
            />
            <FeatureCard
              title="Movement Ledger"
              desc="Every stock move is logged—complete transparency and traceability."
              icon={<ListIcon />}
            />
            <FeatureCard
              title="Secure Access"
              desc="Modern authentication with email verification ensures your data stays safe."
              icon={<LockIcon />}
            />
          </div>
        </div>
      </section>

      {/* WORKFLOW SECTION */}
      <section id="workflow" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-base text-gray-700 font-semibold uppercase tracking-wide">Workflow</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
              How StockMaster Works
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <Step number="01" title="Receive Stock" desc="Record incoming goods. Stock is automatically increased." />
            <Step number="02" title="Organize" desc="Place items into warehouses, shelves, or racks." />
            <Step number="03" title="Deliver Orders" desc="Process outgoing shipments and reduce stock." />
            <Step number="04" title="Track Everything" desc="Monitor movement logs for every stock action." />
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Start free. Upgrade only if you need more warehouses or users.
          </p>

          <div className="mt-12 max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900">Free Plan</h3>
            <p className="text-gray-600 mt-2">Best for beginners and small teams.</p>

            <ul className="mt-6 space-y-3 text-left text-gray-700">
              <li>✔ 1 Warehouse</li>
              <li>✔ Unlimited Products</li>
              <li>✔ Unlimited Receipts & Deliveries</li>
              <li>✔ Dashboard & Reporting</li>
              <li>✔ Movement Ledger</li>
            </ul>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-50 py-10 border-t border-gray-200 text-center text-gray-600">
        <p className="text-lg font-semibold text-gray-900">Ready to take control?</p>
        <p className="mt-2">Join teams using StockMaster to manage inventory smarter.</p>
        <button
          onClick={() => navigate("/signup")}
          className="mt-6 px-6 py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition shadow"
        >
          Get Started Now
        </button>
        <p className="mt-8 text-sm text-gray-500">&copy; 2025 StockMaster. All rights reserved.</p>
      </footer>
    </div>
  );
};

/* COMPONENTS */
const FeatureCard = ({ title, desc, icon }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">
    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm mt-2">{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl hover:shadow-lg transition">
    <div className="text-4xl font-black text-gray-200 mb-4">{number}</div>
    <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
    <p className="text-gray-600 text-sm mt-2">{desc}</p>
  </div>
);

/* ICONS */
const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M3 3v18h18M7 11v6M12 7v10M17 3v14"/>
  </svg>
);
const WarehouseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M3 21V9l9-6 9 6v12H3z"/>
  </svg>
);
const TruckIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M3 5h13v11H3zM16 8h4l2 3v5h-6M5 17a2 2 0 100-4 2 2 0 000 4zM17 17a2 2 0 100-4 2 2 0 000 4z"/>
  </svg>
);
const BoxIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M3 7l9-4 9 4-9 4-9-4zm0 0v10l9 4 9-4V7"/>
  </svg>
);
const ListIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>
  </svg>
);
const LockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M12 17v2m-6 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
  </svg>
);

export default LandingPage;
