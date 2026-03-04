import { usePortal } from '@/hooks/usePortal';
import useTooltip from '@/hooks/useTooltip';
import React from 'react';

export default function Tooltip({
  elementToInteract,
  content,
}: {
  elementToInteract: React.ReactNode;
  content: string;
}) {
  const { isVisible, wrapperRef, tooltipRef, show, hide } = useTooltip();

  const tooltipPortal = usePortal(
    <div
      id="tooltip-content"
      ref={tooltipRef}
      className="text-muted-dark pointer-events-none fixed z-50 w-max max-w-[calc(100vw-16px)] -translate-x-1/2 rounded-md bg-white p-3 text-sm wrap-break-word shadow-md md:max-w-sm"
    >
      {content}
    </div>,
    isVisible,
  );

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onTouchStart={show}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      aria-describedby={isVisible ? 'tooltip-content' : undefined}
      className="relative inline-block w-max cursor-pointer"
    >
      {elementToInteract}
      {tooltipPortal}
    </div>
  );
}
