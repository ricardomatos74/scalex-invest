import { createContext, useContext } from 'react';

type User = {
  role: 'EMPRESA' | 'INVESTIDOR' | 'ADMIN';
};

type AuthContextType = {
  user: User | null;
};

const AuthContext = createContext<AuthContextType>({ user: { role: 'ADMIN' } });

export const useAuth = () => useContext(AuthContext);
