import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

const FinancialsPage: React.FC = () => {
    const location = useLocation();

    const subNavLinks = [
        { to: 'invoices', text: 'Invoices' },
        { to: 'clients', text: 'Clients' },
        { to: 'expenses', text: 'Expenses' },
    ];
    
    const linkClasses = (path: string) => 
        `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            location.pathname.endsWith(path) 
            ? 'bg-indigo-600 text-white' 
            : 'text-gray-300 hover:bg-gray-700'
        }`;

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Financials</h1>
                        <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
                    </div>
                </div>

                <div className="bg-gray-800 shadow-lg rounded-2xl p-4 mb-8">
                    <nav className="flex space-x-2">
                        {subNavLinks.map(link => (
                             <NavLink key={link.to} to={link.to} className={linkClasses(link.to)}>
                                {link.text}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Content for sub-pages will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default FinancialsPage;
