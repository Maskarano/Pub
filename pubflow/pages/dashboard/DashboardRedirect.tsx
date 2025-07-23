
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Role } from '../../types';
import { ROUTES } from '../../constants';

const DashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case Role.CASHIER:
          navigate(ROUTES.DASHBOARD_CASHIER);
          break;
        case Role.ADMIN:
          navigate(ROUTES.DASHBOARD_ADMIN_MENU);
          break;
        case Role.SUPER_ADMIN:
          navigate(ROUTES.DASHBOARD_SUPER_ADMIN_ANALYTICS);
          break;
        default:
          navigate(ROUTES.LOGIN);
      }
    } else {
        navigate(ROUTES.LOGIN);
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <p className="text-white">Redirecting...</p>
    </div>
  );
};

export default DashboardRedirect;
