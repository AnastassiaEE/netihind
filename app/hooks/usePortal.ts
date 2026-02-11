import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function usePortal(children: React.ReactNode, shouldRender: boolean) {
  const [hasMountedPortal, setHasMountedPortal] = useState(false);

  useEffect(() => {
    setHasMountedPortal(true);
  }, []);

  if (!hasMountedPortal || !shouldRender) return null;

  return createPortal(children, document.body);
}
