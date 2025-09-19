import React from 'react';
import DashboardWidgets from '../../components/admin/DashboardWidgets';
import RevenueChart from '../../components/admin/RevenueChart';

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
        {/* Welcome Header */}
        <div>
            <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
            <p className="mt-2 text-lg text-gray-400">
                Welcome back! Here's a snapshot of your agency's performance.
            </p>
        </div>
        
        {/* Stats Widgets */}
        <DashboardWidgets />

        {/* Revenue Chart */}
        <div className="mt-8">
          <RevenueChart />
        </div>
    </div>
  );
};

export default AdminDashboard;