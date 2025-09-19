import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ManageServicesPage from './pages/admin/ManageServicesPage';
import ManagePortfolioPage from './pages/admin/ManagePortfolioPage';
import ManageContactsPage from './pages/admin/ManageContactsPage';
import ManageTestimonialsPage from './pages/admin/ManageTestimonialsPage';
import FinancialsPage from './pages/admin/FinancialsPage';
import InvoicesPage from './pages/admin/financials/InvoicesPage';
import ClientsPage from './pages/admin/financials/ClientsPage';
import ExpensesPage from './pages/admin/financials/ExpensesPage';
import SettingsPage from './pages/admin/SettingsPage';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { DottedSurface } from './components/DottedSurface';
import AdminLayout from './components/admin/AdminLayout';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component to determine which layout to use
const AppLayout: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
  
  if (isAdminRoute) {
    return (
      <AdminLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/services" element={<AdminProtectedRoute><ManageServicesPage /></AdminProtectedRoute>} />
          <Route path="/admin/portfolio" element={<AdminProtectedRoute><ManagePortfolioPage /></AdminProtectedRoute>} />
          <Route path="/admin/testimonials" element={<AdminProtectedRoute><ManageTestimonialsPage /></AdminProtectedRoute>} />
          <Route path="/admin/contacts" element={<AdminProtectedRoute><ManageContactsPage /></AdminProtectedRoute>} />
          <Route path="/admin/financials" element={<AdminProtectedRoute><FinancialsPage /></AdminProtectedRoute>}>
            <Route index element={<Navigate to="invoices" replace />} />
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="clients" element={<ClientsPage />} />
            <Route path="expenses" element={<ExpensesPage />} />
          </Route>
          <Route path="/admin/settings" element={<AdminProtectedRoute><SettingsPage /></AdminProtectedRoute>} />
        </Routes>
      </AdminLayout>
    );
  }

  // Public pages
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <DottedSurface />
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <AppLayout />
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;