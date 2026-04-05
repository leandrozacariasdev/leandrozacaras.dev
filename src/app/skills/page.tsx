'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Skills() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/#habilidades');
  }, [router]);

  return null;
}
