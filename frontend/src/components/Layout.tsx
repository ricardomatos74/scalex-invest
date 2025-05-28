import Link from 'next/link';
import { isAuthenticated, clearToken } from '../utils/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="p-4 bg-gray-800 text-white">
        <nav className="flex gap-4">
          <Link href="/feed" className="hover:underline">
            Feed
          </Link>
          {isAuthenticated() ? (
            <button
              onClick={() => {
                clearToken();
                window.location.href = '/login';
              }}
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Cadastro
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="p-4">{children}</main>
    </>
  );
}
