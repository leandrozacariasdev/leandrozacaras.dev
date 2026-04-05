import { useState, useEffect } from 'react';

/**
 * Hook that returns true after the component has mounted on the client.
 * Useful for preventing hydration mismatches between server and client.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return mounted;
}
