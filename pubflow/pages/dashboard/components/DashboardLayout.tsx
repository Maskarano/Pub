
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { Role } from '../../../types';
import { ROUTES } from '../../../constants';
import Button from '../../../components/ui/Button';
import BarChartIcon from '../../../components/icons/BarChartIcon';
import ClipboardListIcon from '../../../components/icons/ClipboardListIcon';
import BookOpenIcon from '../../../components/icons/BookOpenIcon';
import UsersIcon from '../../../components/icons/UsersIcon';

const navLinks = {
  [Role.CASHIER]: [
    { to: ROUTES.DASHBOARD_CASHIER, label: 'Live Orders', icon: ClipboardListIcon },
  ],
  [Role.ADMIN]: [
    { to: ROUTES.DASHBOARD_CASHIER, label: 'Live Orders', icon: ClipboardListIcon },
    { to: ROUTES.DASHBOARD_ADMIN_MENU, label: 'Menu Management', icon: BookOpenIcon },
    { to: ROUTES.DASHBOARD_ADMIN_USERS, label: 'Manage Cashiers', icon: UsersIcon },
  ],
  [Role.SUPER_ADMIN]: [
    { to: ROUTES.DASHBOARD_SUPER_ADMIN_ANALYTICS, label: 'Analytics', icon: BarChartIcon },
    { to: ROUTES.DASHBOARD_ADMIN_MENU, label: 'Menu Management', icon: BookOpenIcon },
    { to: ROUTES.DASHBOARD_SUPER_ADMIN_MANAGEMENT, label: 'System Management', icon: UsersIcon },
  ],
  [Role.CUSTOMER]: [],
};

const DashboardLayout: React.FC<{ children: React.ReactNode, title: string }> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const roleNavLinks = user ? navLinks[user.role] : [];
  
  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col">
        <div>
          <h2 className="text-2xl font-bold text-amber-400">PubFlow</h2>
          <p className="text-sm text-gray-400">{user?.role} Portal</p>
        </div>
        <nav className="mt-8 flex-grow">
          <ul>
            {roleNavLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 my-1 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'bg-amber-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <link.icon className="h-5 w-5 mr-3"/>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
           <div className="p-4 bg-gray-700 rounded-lg text-center">
              <p className="font-semibold text-white">{user?.name}</p>
              <p className="text-sm text-gray-400">{user?.username}</p>
          </div>
          <Button onClick={handleLogout} variant="secondary" className="w-full mt-4">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 shadow-md p-4">
           <h1 className="text-2xl font-bold text-white">{title}</h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
