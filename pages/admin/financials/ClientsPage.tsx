import React, { useState } from 'react';
import { Client } from '../../../types/financial';
import { PlusIcon, EditIcon, TrashIcon } from '../../../components/icons';

const initialClients: Client[] = [
    { _id: 'c1', name: 'Tech Innovators', email: 'contact@techinnovators.com', phone: '123-456-7890', address: '123 Tech Ave, Silicon Valley', createdAt: new Date().toISOString() },
    { _id: 'c2', name: 'ConnectCo', email: 'hello@connectco.io', phone: '987-654-3210', address: '456 Social St, Marketing City', createdAt: new Date().toISOString() },
    { _id: 'c3', name: 'EduFuture', email: 'support@edufuture.com', phone: '555-123-4567', address: '789 Learning Ln, Knowledge Town', createdAt: new Date().toISOString() },
];

const ClientsPage: React.FC = () => {
    const [clients, setClients] = useState<Client[]>(initialClients);
    
    return (
        <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 flex justify-between items-center border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white">Manage Clients</h2>
                <button className="flex items-center gap-2 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                    <PlusIcon className="w-5 h-5" /> Add New Client
                </button>
            </div>
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contact</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Address</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {clients.map((client) => (
                            <tr key={client._id} className="hover:bg-gray-700/50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{client.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                                    <div>{client.email}</div>
                                    <div>{client.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{client.address}</td>
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

export default ClientsPage;
