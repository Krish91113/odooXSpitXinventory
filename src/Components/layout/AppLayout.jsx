// src/Components/layout/AppLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { signOut, useSession } from "../../lib/auth";

const AppLayout = () => {
  const navigate = useNavigate();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      {/* ---- SIDEBAR ---- */}
      <aside className="w-60 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        
        {/* Logo */}
        <div
          className="px-6 py-5 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Stock<span className="text-zinc-400">Master</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 mt-4">
          <SidebarLink to="/dashboard" label="Dashboard" />
          <SidebarLink to="/receipts" label="Receipts" />
          <SidebarLink to="/delivery" label="Deliveries" />
          <SidebarLink to="/stock" label="Stock" />
          <SidebarLink to="/move-history" label="Move History" />
          <SidebarLink to="/settings" label="Settings" />
        </nav>

        {/* User info + Logout */}
        <div className="p-4 border-t border-zinc-800">
          <p className="text-xs text-zinc-400 truncate mb-3">
            {session?.user?.email || "User"}
          </p>

          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* ---- MAIN AREA ---- */}
      <div className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <header className="h-14 bg-zinc-950/70 backdrop-blur border-b border-zinc-800 flex items-center px-6">
          <h1 className="text-zinc-300 text-sm">Inventory Management System</h1>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 text-sm rounded-lg transition ${
        isActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
      }`
    }
  >
    {label}
  </NavLink>
);

export default AppLayout;
