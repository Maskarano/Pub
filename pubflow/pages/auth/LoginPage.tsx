import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { ROUTES } from '../../constants';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const user = await auth.login(username);

    setIsLoading(false);
    if (user) {
      navigate(ROUTES.DASHBOARD);
    } else {
      setError('Invalid username. Please use one of the demo accounts below.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-amber-400 text-center mb-8">PubFlow Staff Login</h1>
        <Card className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Login
            </Button>
          </form>
        </Card>
        <div className="mt-6 text-center text-gray-400 text-sm">
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-gray-200 mb-2">Demo Accounts</h4>
                <p>Use one of the following usernames to log in:</p>
                <ul className="mt-2 space-y-1 text-left inline-block">
                    <li><code className="inline-block text-amber-300 bg-gray-900 px-2 py-1 rounded w-28 text-center mr-2">cashier1</code> - Cashier Role</li>
                    <li className="mt-1"><code className="inline-block text-amber-300 bg-gray-900 px-2 py-1 rounded w-28 text-center mr-2">admin1</code> - Admin Role</li>
                    <li className="mt-1"><code className="inline-block text-amber-300 bg-gray-900 px-2 py-1 rounded w-28 text-center mr-2">superadmin</code> - Super Admin</li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;