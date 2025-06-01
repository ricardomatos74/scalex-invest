import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getToken, parseToken } from '../utils/auth';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();

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
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
