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
        'border-x border-b border-muted-light first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b':
            variant === 'outlined',
    });

    const buttonClasses = classNames('flex w-full items-center justify-between text-left', {
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
        isOpened ? 'bg-primary text-white shadow-md shadow-primary/50' : 'bg-primary-light',
        'transition-colors',
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
                className="transition-all duration-500"
                style={{ height: collapsibleHeight + 'px' }}
            >
                <div ref={collapsible} className={bodyClasses}>
                    {body}
                </div>
            </div>
        </div>
    );
}
