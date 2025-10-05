import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-all-ease">
      {user ? <DashboardPage /> : <LoginPage />}
    </div>
  );
};

export default App;