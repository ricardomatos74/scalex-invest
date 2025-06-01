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
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    console.log('AuthProvider init token', token);
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
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
