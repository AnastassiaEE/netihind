'use client';

import CircleArrow from '@/components/ui/icons/CircleArrow';
import useAccordionItem from '@/hooks/useAccordionItem';
import classNames from 'classnames';
import Arrow from '@/components/ui/icons/Arrow';
import React from 'react';
import { tv } from 'tailwind-variants';
import { AccordionBorder } from '@/components/ui/accordion/Accordion';
import { AccordionSize } from '@/components/ui/accordion/Accordion';
import { ArrowStyle } from '@/components/ui/accordion/Accordion';
import { ArrowPosition } from '@/components/ui/accordion/Accordion';

export default function AccordionItem({
  border = 'none',
  size = 'sm',
  arrowStyle = 'default',
  arrowPosition = 'right',
  collapsed = true,
  children,
}: {
  border?: AccordionBorder;
  size?: AccordionSize;
  arrowStyle?: ArrowStyle;
  arrowPosition?: ArrowPosition;
  collapsed?: boolean;
  children: React.ReactNode;
}) {
  const {
    isCollapsed,
    isVisible,
    toggle,
    collapsibleRef,
    collapsibleHeight,
    id,
    handleTransitionEnd,
  } = useAccordionItem(collapsed);

  const wrapperClasses = tv({
    variants: {
      border: {
        none: '',
        bottom: 'border-b border-muted-light',
        full: 'border-muted-light [&:not(:last-child)]:border-b',
      },
    },
    defaultVariants: {
      border: 'none',
    },
  });

  const buttonClasses = tv({
    base: 'flex w-full items-center text-left transition-all',
    variants: {
      border: {
        none: '',
        bottom: '',
        full: classNames(
          !isCollapsed && 'border-muted-light [&:not(:last-child)]:border-b',
        ),
      },
      size: {
        sm: 'p-1',
        md: 'p-3',
        lg: 'p-6',
      },
      arrowPosition: {
        left: 'justify-left gap-3',
        right: 'flex-row-reverse justify-between',
      },
    },
    defaultVariants: {
      size: 'sm',
      arrowPosition: 'right',
    },
  });

  const panelClasses = tv({
    variants: {
      size: {
        sm: 'p-1',
        md: 'p-3',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  });

  const arrowClasses = tv({
    variants: {
      arrowStyle: {
        default: '',
        circle: classNames(
          'transition-colors',
          isCollapsed
            ? 'bg-primary-light'
            : 'bg-primary text-white shadow-md shadow-primary/50',
        ),
      },
    },
    defaultVariants: {
      arrowStyle: 'default',
    },
  });

  const renderArrow = () => {
    if (arrowStyle === 'default')
      return <Arrow direction={isCollapsed ? 'up' : 'down'}></Arrow>;
    return (
      <CircleArrow
        direction={isCollapsed ? 'up' : 'down'}
        className={arrowClasses({ arrowStyle })}
      />
    );
  };

  return (
    <div className={wrapperClasses({ border })}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={!isCollapsed}
        aria-controls={id.current}
        className={buttonClasses({ border, size, arrowPosition })}
      >
        {renderArrow()}
        {children && React.Children.toArray(children)[0]}
      </button>
      {isVisible && (
        <div
          id={id.current}
          className={`overflow-hidden transition-all duration-500`}
          onTransitionEnd={handleTransitionEnd}
          style={{ height: collapsibleHeight + 'px' }}
        >
          <div ref={collapsibleRef} className={panelClasses({ size })}>
            {children && React.Children.toArray(children)[1]}
          </div>
        </div>
      )}
    </div>
  );
}
