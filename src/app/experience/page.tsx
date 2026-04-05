'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Experience() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/#experiencia');
  }, [router]);

  return null;
}
