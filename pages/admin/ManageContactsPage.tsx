import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { TrashIcon, CheckCircleIcon } from '../../components/icons';

// Types
interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const ManageContactsPage: React.FC = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = useCallback(() => {
        setIsLoading(true);
        setError(null);
        try {
            const messagesFromStorage = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            setMessages(messagesFromStorage);
        } catch (err: any) {
            setError('Failed to load messages from your browser\'s storage.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);
    
    const handleToggleRead = (id: string, currentStatus: boolean) => {
        try {
            const updatedMessages = messages.map(msg => 
                msg._id === id ? { ...msg, isRead: !currentStatus } : msg
            );
            localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
            setMessages(updatedMessages);
        } catch (err) {
            setError('Could not update message status.');
        }
    }

    const handleDelete = (id: string) => {
        if(window.confirm('Are you sure you want to delete this message? This cannot be undone.')) {
            try {
                const updatedMessages = messages.filter(msg => msg._id !== id);
                localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                setMessages(updatedMessages);
            } catch (err) {
                setError('Could not delete message.');
            }
        }
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-extrabold text-white">Contact Submissions</h1>
                        <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
                    </div>
                </div>
                
                {isLoading && <p className="text-center text-gray-400">Loading messages...</p>}
                {error && <p className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</p>}

                {!isLoading && !error && (
                    <div className="bg-gray-800 shadow-lg rounded-2xl overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700/50">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">From</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Message</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Received</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {messages.map((msg) => (
                                    <tr key={msg._id} className={`${!msg.isRead ? 'bg-indigo-900/20' : ''} hover:bg-gray-700/50 transition-colors`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {!msg.isRead && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-500 text-white">New</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className={`text-sm font-medium ${!msg.isRead ? 'text-white' : 'text-gray-300'}`}>{msg.name}</div>
                                            <div className="text-sm text-gray-400">{msg.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400 max-w-md">
                                            <p className="truncate" title={msg.message}>{msg.message}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(msg.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleToggleRead(msg._id, msg.isRead)} 
                                                className={`p-2 rounded-full ${msg.isRead ? 'text-gray-500 hover:text-green-400 hover:bg-gray-700' : 'text-green-400 hover:text-gray-400 hover:bg-gray-700'}`}
                                                title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                                            >
                                                <CheckCircleIcon className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-400 ml-2 p-2 rounded-full hover:bg-gray-700" title="Delete Message">
                                                <TrashIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {messages.length === 0 && <p className="text-center text-gray-500 py-8">No contact messages found.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageContactsPage;
