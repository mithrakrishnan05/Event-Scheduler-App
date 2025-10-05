import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Role } from '../types';

const Header: React.FC = () => {
    const { user, users, logout, switchUser } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const getRoleBadgeColor = (role: Role) => {
        switch (role) {
            case Role.ADMIN: return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200';
            case Role.ORGANIZER: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200';
            case Role.STUDENT: return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    }

    return (
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">📅 Event Scheduler Pro</span>
                    </div>
                    <div className="flex items-center space-x-4">
                         <div className="hidden sm:block">
                            <label htmlFor="user-switcher" className="sr-only">Switch User:</label>
                            <select
                                id="user-switcher"
                                value={user?.id}
                                onChange={(e) => switchUser(e.target.value)}
                                className="rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            >
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>

                        {user && (
                            <div className="flex items-center space-x-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{user.name}</p>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleBadgeColor(user.role)}`}>
                                        {user.role}
                                    </span>
                                </div>
                                <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary-500 transition-all-ease">
                                  {theme === 'dark' ? 
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                  }
                                </button>
                                <button
                                    onClick={logout}
                                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-primary-500 transition-all-ease"
                                    aria-label="Logout"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
