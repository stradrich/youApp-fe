'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedProfile({ children }) {
  const router = useRouter();
  const isLoggedIn = true; // replace with real auth check

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null; // or a spinner

  return <>{children}</>;
}
