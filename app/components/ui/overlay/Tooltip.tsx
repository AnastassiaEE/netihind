import useTooltip from '@/hooks/useTooltip';
import React from 'react';
import { createPortal } from 'react-dom';

export default function Tooltip({
  elementToInteract,
  content,
}: {
  elementToInteract: React.ReactElement<any>;
  content: string;
}) {
  const { isVisible, pos, wrapperRef, tooltipRef, show, hide } = useTooltip();

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

      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed z-50 max-w-[250px] rounded-md bg-white p-3 text-sm text-muted-dark shadow-md"
            style={{
              top: pos.top,
              left: pos.left,
              transform: 'translateX(-50%)',
            }}
          >
            {content}
          </div>,
          document.body,
        )}
    </div>
  );
}
