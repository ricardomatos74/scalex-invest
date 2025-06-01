import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getToken, parseToken } from '../utils/auth';

export type User = {
  role: string;
  name?: string;
  userId?: number;
};

interface AuthContextType {
  user: User | null;
  setUser: (u: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const payload = parseToken(token);
      if (payload) {
        setUser({
          role: (payload.type || payload.role)?.toLowerCase(),
          name: payload.name,
          userId: payload.userId,
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
