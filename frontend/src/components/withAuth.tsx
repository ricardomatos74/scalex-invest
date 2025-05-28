import { useRouter } from 'next/router';
import { useEffect, useState, ComponentType } from 'react';
import { getToken, getRole, getDashboardRoute } from '../utils/auth';

export default function withAuth<P>(Wrapped: ComponentType<P>, roles: string[]) {
  return function Protected(props: P) {
    const router = useRouter();
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
      const token = getToken();
      const role = getRole();
      if (!token) {
        router.replace('/login');
        return;
      }
      if (role && !roles.includes(role)) {
        router.replace(getDashboardRoute(role));
        return;
      }
      setAllowed(true);
    }, []);

    if (!allowed) return null;
    return <Wrapped {...props} />;
  };
}
