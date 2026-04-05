'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/#experiencia');
  }, [router]);

  return null;
}
