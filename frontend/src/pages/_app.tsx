import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthProvider } from '../contexts/AuthContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
