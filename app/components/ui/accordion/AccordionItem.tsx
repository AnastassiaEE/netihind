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
  const { isExpanded, toggle, collapsible, collapsibleHeight, id } =
    useAccordionItem(isCollapsed);

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
          isExpanded && 'border-muted-light [&:not(:last-child)]:border-b',
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
          isExpanded
            ? 'bg-primary text-white shadow-md shadow-primary/50'
            : 'bg-primary-light',
        ),
      },
    },
    defaultVariants: {
      arrowStyle: 'default',
    },
  });

  const renderArrow = () => {
    if (arrowStyle === 'default')
      return <Arrow direction={isExpanded ? 'down' : 'up'}></Arrow>;
    return (
      <CircleArrow
        direction={isExpanded ? 'down' : 'up'}
        className={arrowClasses({ arrowStyle })}
      />
    );
  };

  return (
    <div className={wrapperClasses({ border })}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isExpanded}
        aria-controls={id.current}
        className={buttonClasses({ border, size, arrowPosition })}
      >
        {renderArrow()}
        {children && React.Children.toArray(children)[0]}
      </button>
      <div
        id={id.current}
        className="overflow-y-hidden transition-all duration-500"
        style={{ height: collapsibleHeight + 'px' }}
      >
        <div ref={collapsible} className={panelClasses({ size })}>
          {children && React.Children.toArray(children)[1]}
        </div>
      </div>
    </div>
  );
}
