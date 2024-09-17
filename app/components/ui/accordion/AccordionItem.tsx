'use client';

import { Children } from 'react';
import CircleArrow from '../icons/CircleArrow';
import useAccordionItem from '@/hooks/useAccordionItem';
import classNames from 'classnames';

const closedArrowClasses = classNames('bg-neutral-light');

const openedArrowClasses = classNames(
    'bg-primary',
    'outline-none',
    'shadow-md',
    'shadow-primary/50',
    'text-white',
);

const accordionItemClasses = classNames(
    'border-x',
    'border-b',
    'border-muted-light',
    'first:border-t',
    'first:rounded-t-lg',
    'last:border-b',
    'last:rounded-b-lg',
    'overflow-hidden',
);

export default function AccordionItem({ children }: { children: React.ReactNode }) {
    const { isOpened, toggle, collapsible, id } = useAccordionItem();

    const [question, answer] = Children.toArray(children);

    const buttonClasses = classNames('flex justify-between items-center text-left w-full p-6', {
        'border-b': isOpened,
    });

    return (
        <div className={accordionItemClasses}>
            <button
                type="button"
                className={buttonClasses}
                onClick={toggle}
                aria-expanded={isOpened ? 'true' : 'false'}
                aria-controls={id.current}
            >
                <span className="text-base font-semibold">{question}</span>
                {isOpened ? (
                    <CircleArrow direction="up" style={openedArrowClasses} />
                ) : (
                    <CircleArrow direction="down" style={closedArrowClasses} />
                )}
            </button>
            <div
                id={id.current}
                className="transition-all duration-700"
                style={isOpened ? { height: `${collapsible.current?.offsetHeight}px` } : { height: 0 }}
            >
                <div ref={collapsible} className="text-muted-dark text-sm p-6">
                    {answer}
                </div>
            </div>
        </div>
    );
}
