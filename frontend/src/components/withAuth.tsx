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
    const { setUser, loading } = useAuth();

    useEffect(() => {
      if (loading) return;
      const token = getToken();
      console.log('withAuth token', token);
      if (!token) {
        router.push('/login');
        return;
      }

      const payload = parseToken(token);
      const role = payload?.type || payload?.role;
      console.log('withAuth payload', payload);
      if (!role || !allowedRoles.includes(role.toLowerCase())) {
        router.push('/login');
        return;
      }

      setUser({
        role: role.toLowerCase(),
        name: payload?.name,
        userId: payload?.userId,
      });
    }, [router, setUser, loading]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
