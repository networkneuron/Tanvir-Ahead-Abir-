import React, { useState } from 'react';
import { Invoice, Client } from '../../../types/financial';
import { formatCurrency, formatDate, getStatusColor } from '../../../utils/helpers';
import { PlusIcon, EditIcon, TrashIcon } from '../../../components/icons';

const initialClients: Client[] = [
    { _id: 'c1', name: 'Tech Innovators', email: 'contact@techinnovators.com', phone: '123-456-7890', address: '123 Tech Ave, Silicon Valley', createdAt: new Date().toISOString() },
    { _id: 'c2', name: 'ConnectCo', email: 'hello@connectco.io', phone: '987-654-3210', address: '456 Social St, Marketing City', createdAt: new Date().toISOString() },
];

const initialInvoices: Invoice[] = [
    { _id: 'inv1', invoiceNumber: 'INV-001', client: initialClients[0], issueDate: '2023-10-01', dueDate: '2023-10-31', items: [{ description: 'Video Editing', quantity: 1, price: 1500 }], status: 'Paid' },
    { _id: 'inv2', invoiceNumber: 'INV-002', client: initialClients[1], issueDate: '2023-10-15', dueDate: '2023-11-15', items: [{ description: 'Community Management (Monthly)', quantity: 1, price: 800 }], status: 'Unpaid' },
    { _id: 'inv3', invoiceNumber: 'INV-003', client: initialClients[0], issueDate: '2023-11-01', dueDate: '2023-12-01', items: [{ description: '2D Animation Explainer', quantity: 1, price: 2500 }], status: 'Pending' },
];

const InvoicesPage: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);

    const calculateTotal = (items: { quantity: number; price: number }[]) => {
        return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
    
    return (
        <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Manage Invoices</h2>
                 <button className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Create New Invoice
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Number</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Client</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Due Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {invoices.map((invoice) => (
                            <tr key={invoice._id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-400">{invoice.invoiceNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{invoice.client.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(invoice.dueDate)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{formatCurrency(calculateTotal(invoice.items))}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-indigo-400 hover:text-indigo-300 mr-4"><EditIcon /></button>
                                    <button className="text-red-500 hover:text-red-400"><TrashIcon /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoicesPage;
