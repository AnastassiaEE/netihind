import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders children into a React portal attached to `document.body`.
 *
 * This hook ensures that the portal is only mounted on the client
 * (after hydration) and optionally controls whether it should render.
 *
 * Useful for modals, tooltips, or any content that should escape
 * the normal DOM hierarchy.
 *
 * @param children - React elements to render inside the portal
 * @param shouldRender - Whether the portal content should be rendered
 *
 * @returns The portal-rendered children or `null` if not ready / should not render.
 */
export function usePortal(children: React.ReactNode, shouldRender: boolean) {
  const [hasMountedPortal, setHasMountedPortal] = useState(false);

  /**
   * Marks the portal as mounted after the first render
   * to avoid server/client rendering mismatches.
   */
  useEffect(() => {
    setHasMountedPortal(true);
  }, []);

  if (!hasMountedPortal || !shouldRender) return null;

  return createPortal(children, document.body);
}
