const TOKEN_KEY = 'scalex_token';
const ROLE_KEY = 'scalex_role';

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function setRole(role: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(ROLE_KEY, role);
  }
}

export function getRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ROLE_KEY);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }
}

export function isAuthenticated() {
  return !!getToken();
}

export function parseToken(token: string): any | null {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    return null;
  }
}

export function getDashboardRoute(role: string | null) {
  switch (role) {
    case 'empresa':
      return '/dashboard/empresa';
    case 'admin':
      return '/dashboard/admin';
    default:
      return '/dashboard/investidor';
  }
}
