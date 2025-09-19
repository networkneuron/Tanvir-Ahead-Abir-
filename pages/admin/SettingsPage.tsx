import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const SettingsPage: React.FC = () => {
    const { logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords don't match." });
            return;
        }
        if (newPassword.length < 6) {
             setMessage({ type: 'error', text: "Password must be at least 6 characters long." });
            return;
        }
        // In a real app, this would be an API call
        console.log('Changing password...');
        setMessage({ type: 'success', text: "Password updated successfully!" });
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <div className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div>
                    <h1 className="text-4xl font-extrabold text-white">Settings</h1>
                    <NavLink to="/admin/dashboard" className="text-indigo-400 hover:underline">&larr; Back to Dashboard</NavLink>
                </div>

                {/* Change Password */}
                <div className="bg-gray-800 shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                    <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Old Password</label>
                            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full bg-gray-700 border-gray-600 rounded-lg p-3 text-white" />
                        </div>
                         {message && <p className={`text-sm ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{message.text}</p>}
                        <div>
                            <button type="submit" className="bg-indigo-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-indigo-700 transition-colors">Update Password</button>
                        </div>
                    </form>
                </div>
                
                {/* Theme Toggle */}
                 <div className="bg-gray-800 shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Appearance</h2>
                    <div className="flex items-center justify-between">
                         <p className="text-gray-300">Switch between light and dark mode.</p>
                         <button onClick={toggleTheme} className="bg-gray-700 text-white font-medium py-2 px-4 rounded-lg">
                            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                         </button>
                    </div>
                 </div>

                 {/* Logout */}
                <div className="bg-gray-800 shadow-lg rounded-2xl p-8">
                     <h2 className="text-2xl font-bold text-white mb-4">Account</h2>
                     <p className="text-gray-400 mb-4">End your current admin session.</p>
                     <button onClick={logout} className="bg-red-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-700 transition-colors">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
