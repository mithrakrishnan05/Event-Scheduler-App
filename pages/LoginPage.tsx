import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [selectedEmail, setSelectedEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { login, users } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail) {
      setError('Please select a user to log in.');
      return;
    }
    setLoading(true);
    setError('');
    const success = await login(selectedEmail);
    if (!success) {
      setError('Login failed. Please try again.');
    }
    setLoading(false);
  };
  
  React.useEffect(() => {
      if(users.length > 0 && !selectedEmail) {
          setSelectedEmail(users[0].email);
      }
  }, [users, selectedEmail]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 bg-gradient-to-br from-primary-100 via-gray-50 to-blue-100 dark:from-primary-900/50 dark:via-gray-900 dark:to-blue-900/50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
              <span className="mr-3">📅</span>Event Scheduler Pro
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Please select a user profile to continue</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="user-select" className="sr-only">Select User</label>
              <select
                id="user-select"
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
                className="relative block w-full px-4 py-3 text-lg text-gray-900 placeholder-gray-500 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10"
              >
                {users.map(user => (
                    <option key={user.id} value={user.email}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex justify-center w-full px-4 py-3 text-lg font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 dark:disabled:bg-primary-800 transition-all-ease"
            >
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;