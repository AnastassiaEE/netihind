'use client';

import CircleArrow from '@/components/ui/icons/CircleArrow';
import useAccordionItem from '@/hooks/useAccordionItem';
import classNames from 'classnames';
import { AccordionFontStyles, AccordionVariant } from '@/components/ui/accordion/Accordion';
import Arrow from '@/components/ui/icons/Arrow';

export default function AccordionItem({
    variant,
    isCollapsed,
    header,
    body,
    fontStyles,
}: {
    variant: AccordionVariant;
    isCollapsed: boolean;
    header: string;
    body: React.ReactNode;
    fontStyles: AccordionFontStyles;
}) {
    const { isOpened, toggle, collapsible, collapsibleHeight, id } = useAccordionItem(isCollapsed);

    const isOutlined = variant === 'outlined';
    const isSolid = variant === 'solid';

    const wrapperClasses = classNames('overflow-hidden', {
        'border-x border-b border-muted-light first:border-t first:rounded-t-lg last:border-b last:rounded-b-lg':
            variant === 'outlined',
    });

    const buttonClasses = classNames('flex justify-between items-center text-left w-full', {
        'p-6': isOutlined,
        'py-2': isSolid,
        'border-b': isOpened && isOutlined,
    });

    const headerClasses = classNames('font-semibold', fontStyles.header);

    const bodyClasses = classNames(fontStyles.body, {
        'p-6': isOutlined,
        'py-2': isSolid,
    });

    const arrowClasses = classNames(
        'transition-colors',
        isOpened ? 'bg-primary shadow-md shadow-primary/50 text-white' : 'bg-primary-light',
    );

    return (
        <div className={wrapperClasses}>
            <button
                type="button"
                className={buttonClasses}
                onClick={toggle}
                aria-expanded={isOpened ? 'true' : 'false'}
                aria-controls={id.current}
            >
                <span className={headerClasses}>{header}</span>
                {isOutlined ? (
                    <CircleArrow direction={isOpened ? 'up' : 'down'} className={arrowClasses} />
                ) : (
                    <Arrow direction={isOpened ? 'up' : 'down'} />
                )}
            </button>
            <div
                id={id.current}
                className="transition-all duration-700"
                style={{ height: collapsibleHeight + 'px' }}
            >
                <div ref={collapsible} className={bodyClasses}>
                    {body}
                </div>
            </div>
        </div>
    );
}
