import React from 'react';
import { motion } from 'framer-motion';

const KPISection = () => {
  const kpis = [
    { label: 'Total Products', value: '1,247', trend: '+12%', icon: <BoxIcon />, color: 'blue' },
    { label: 'Low Stock Items', value: '23', trend: '-5%', icon: <AlertIcon />, alert: true },
    { label: 'Out of Stock', value: '4', trend: '0%', icon: <XCircleIcon />, alert: true },
    { label: 'Pending Receipts', value: '8', trend: '+2', icon: <InboxIcon />, color: 'indigo' },
    { label: 'Pending Deliveries', value: '12', trend: '+4', icon: <TruckIcon />, color: 'orange' },
    { label: 'Internal Transfers', value: '5', trend: 'Today', icon: <RefreshIcon />, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {kpis.map((kpi, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="group"
        >
          <div className={`bg-white border ${kpi.alert ? 'border-red-200 shadow-red-100' : 'border-gray-200'} rounded-2xl p-5 hover:shadow-2xl transition-all duration-500 group-hover:border-gray-400`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`h-12 w-12 rounded-xl ${kpi.alert ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {kpi.icon}
              </div>
              <span className={`text-sm font-bold ${kpi.alert ? 'text-red-600' : 'text-green-600'}`}>
                {kpi.trend}
              </span>
            </div>
            <motion.h4 
              className="text-3xl font-black text-gray-900"
              whileHover={{ scale: 1.05 }}
            >
              {kpi.value}
            </motion.h4>
            <p className="text-sm text-gray-600 mt-1 font-medium">{kpi.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Icons with better size
const BoxIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const AlertIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const XCircleIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const InboxIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>;
const TruckIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>;
const RefreshIcon = () => <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;

export default KPISection;