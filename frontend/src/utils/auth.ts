const TOKEN_KEY = 'scalex_token';

export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function isAuthenticated() {
  return !!getToken();
}
