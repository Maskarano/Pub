
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import { CartProvider } from './contexts/CartContext';
import { ROUTES } from './constants';
import MenuPage from './pages/customer/MenuPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage';
import LoginPage from './pages/auth/LoginPage';
import DashboardRedirect from './pages/dashboard/DashboardRedirect';
import CashierDashboard from './pages/dashboard/cashier/CashierDashboard';
import MenuManagement from './pages/dashboard/admin/MenuManagement';
import UserManagement from './pages/dashboard/admin/UserManagement';
import SuperAdminAnalytics from './pages/dashboard/superadmin/SuperAdminAnalytics';
import SystemManagement from './pages/dashboard/superadmin/SystemManagement';

const ProtectedRoute: React.FC<{ children: React.ReactNode, roles?: string[] }> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Customer Routes */}
            <Route path={ROUTES.HOME} element={<MenuPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
            <Route path={ROUTES.CONFIRMATION} element={<OrderConfirmationPage />} />

            {/* Auth Route */}
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />

            {/* Dashboard Routes */}
            <Route path={ROUTES.DASHBOARD} element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
            
            {/* Cashier Routes */}
            <Route path={ROUTES.DASHBOARD_CASHIER} element={<ProtectedRoute roles={['Cashier', 'Admin']}><CashierDashboard /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path={ROUTES.DASHBOARD_ADMIN_MENU} element={<ProtectedRoute roles={['Admin', 'Super Admin']}><MenuManagement /></ProtectedRoute>} />
            <Route path={ROUTES.DASHBOARD_ADMIN_USERS} element={<ProtectedRoute roles={['Admin']}><UserManagement /></ProtectedRoute>} />

            {/* Super Admin Routes */}
            <Route path={ROUTES.DASHBOARD_SUPER_ADMIN_ANALYTICS} element={<ProtectedRoute roles={['Super Admin']}><SuperAdminAnalytics /></ProtectedRoute>} />
            <Route path={ROUTES.DASHBOARD_SUPER_ADMIN_MANAGEMENT} element={<ProtectedRoute roles={['Super Admin']}><SystemManagement /></ProtectedRoute>} />

            {/* Fallback Redirect */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
