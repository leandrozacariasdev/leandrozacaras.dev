'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Education() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/#formacao');
  }, [router]);

  return null;
}
