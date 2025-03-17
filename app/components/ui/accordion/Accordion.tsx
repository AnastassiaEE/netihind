import classNames from 'classnames';
import React from 'react';

export type AccordionBorder = 'none' | 'bottom' | 'full';
export type AccordionSize = 'sm' | 'md' | 'lg';
export type ArrowStyle = 'default' | 'circle';
export type ArrowPosition = 'left' | 'right';

export default function Accordion({
  border = 'none',
  size = 'sm',
  arrowStyle = 'default',
  arrowPosition = 'right',
  isCollapsed = true,
  children,
}: {
  border?: AccordionBorder;
  size?: AccordionSize;
  arrowStyle?: ArrowStyle;
  arrowPosition?: ArrowPosition;
  isCollapsed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={classNames(
        border === 'full' && 'rounded-md border border-muted-light',
      )}
    >
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement<{
            border?: AccordionBorder;
            size?: AccordionSize;
            arrowStyle?: ArrowStyle;
            arrowPosition?: ArrowPosition;
            isCollapsed?: boolean;
          }>(child)
        ) {
          return React.cloneElement(child, {
            border,
            size,
            arrowStyle,
            arrowPosition,
            isCollapsed,
          });
        }
        return child;
      })}
    </div>
  );
}
