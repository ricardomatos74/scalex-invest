import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        router.push('/login');
        return;
      }

      if (!allowedRoles.includes(user.role)) {
        router.push('/');
      }
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
