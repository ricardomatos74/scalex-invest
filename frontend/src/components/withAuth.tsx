import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken, parseToken } from '../utils/auth';
import { useAuth } from '../contexts/AuthContext';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { setUser } = useAuth();

    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push('/login');
        return;
      }

      const payload = parseToken(token);
      const role = payload?.type || payload?.role;
      if (!role || !allowedRoles.includes(role.toLowerCase())) {
        router.push('/login');
        return;
      }

      setUser({
        role: role.toLowerCase(),
        name: payload?.name,
        userId: payload?.userId,
      });
    }, [router, setUser]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
