import React from 'react';
import { ServiceIcon, PortfolioIcon, FinancialsIcon, ContactsIcon } from '../icons';

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
    <div className={`bg-gray-800 p-6 rounded-2xl shadow-lg flex items-center gap-6 border-l-4 ${color}`}>
        <div className={`p-3 rounded-full bg-gray-700`}>{icon}</div>
        <div>
            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
            <p className="text-white text-3xl font-bold">{value}</p>
        </div>
    </div>
);

const DashboardWidgets: React.FC = () => {
    // In a real app, this data would come from an API. Here we simulate it.
    const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newContacts = contactMessages.filter((m: { isRead: boolean }) => !m.isRead).length;

    const stats = {
        services: 4,
        portfolioItems: 3,
        totalRevenue: '$14,850',
    };
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<ServiceIcon className="w-8 h-8 text-indigo-400" />} title="Total Services" value={stats.services.toString()} color="border-indigo-500" />
            <StatCard icon={<PortfolioIcon className="w-8 h-8 text-purple-400" />} title="Portfolio Items" value={stats.portfolioItems.toString()} color="border-purple-500" />
            <StatCard icon={<FinancialsIcon className="w-8 h-8 text-green-400" />} title="Total Revenue" value={stats.totalRevenue} color="border-green-500" />
            <StatCard icon={<ContactsIcon className="w-8 h-8 text-yellow-400" />} title="New Contacts" value={newContacts.toString()} color="border-yellow-500" />
        </div>
    );
};

export default DashboardWidgets;
