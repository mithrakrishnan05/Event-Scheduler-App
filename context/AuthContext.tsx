
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { authApi } from '../services/eventApi';

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
        const allUsers = await authApi.getUsers();
        setUsers(allUsers);
    };
    fetchUsers();
  }, []);

  const login = async (email: string) => {
    const loggedInUser = await authApi.login(email);
    if (loggedInUser) {
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };
  
  const switchUser = (userId: string) => {
    const newUser = users.find(u => u.id === userId);
    if (newUser) {
        setUser(newUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, switchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
