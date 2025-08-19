'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/'); // or wherever you want
  }, [router]);

  return null; // renders nothing
}
