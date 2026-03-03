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
      className="text-muted-dark fixed z-50 max-w-62.5 rounded-md bg-white p-3 text-sm shadow-md"
      style={{
        transform: 'translateX(-50%)',
      }}
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
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      aria-describedby={isVisible ? 'tooltip-content' : undefined}
      className="relative inline-block cursor-pointer"
    >
      {elementToInteract}
      {tooltipPortal}
    </div>
  );
}
