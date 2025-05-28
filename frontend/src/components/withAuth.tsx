import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles: string[]
) {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const router = useRouter();
    const { user } = useAuth();

    if (!user) {
      router.push('/login');
      return null;
    }

    if (!allowedRoles.includes(user.role)) {
      router.push('/');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}
