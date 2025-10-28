'use client';

import useTooltip from '@/hooks/useTooltip';
import classNames from 'classnames';
import React from 'react';

export default function Tooltip({
  elementToInteract,
  content,
}: {
  elementToInteract: React.ReactElement<any>;
  content: string;
}) {
  const { isVisible, show, hide } = useTooltip();

  return (
    <div className="relative">
      {React.cloneElement(elementToInteract, {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        className: classNames(
          elementToInteract.props.className,
          'cursor-pointer text-xs',
        ),
        'aria-describedby': isVisible ? 'tooltip-content' : undefined,
        tabIndex: 0,
      })}
      {isVisible && (
        <span
          id="tooltip-content"
          role="tooltip"
          className="absolute -left-full bottom-full w-max max-w-xs rounded-md bg-white p-3 text-center text-sm lowercase shadow-md"
        >
          {content}
        </span>
      )}
    </div>
  );
}
