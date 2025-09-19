import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardWidgets from '../../components/admin/DashboardWidgets';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          <DashboardWidgets />
        </div>
    </div>
  );
};

export default AdminDashboard;