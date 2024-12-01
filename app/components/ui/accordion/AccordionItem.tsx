'use client';

import CircleArrow from '@/components/ui/icons/CircleArrow';
import useAccordionItem from '@/hooks/useAccordionItem';
import classNames from 'classnames';

export default function AccordionItem({ header, body }: { header: string; body: React.ReactNode }) {
    const { isOpened, toggle, collapsible, id } = useAccordionItem();

    const buttonClasses = classNames('flex justify-between items-center text-left w-full p-6', {
        'border-b': isOpened,
    });

    const arrowClasses = classNames(
        'transition-transform duration-300',
        isOpened ? 'bg-primary shadow-md shadow-primary/50 text-white' : 'bg-primary-light',
    );

    const collapsibleStyle = isOpened
        ? { height: `${collapsible.current?.offsetHeight}px` }
        : { height: 0 };

    return (
        <div className="border-x border-b border-muted-light first:border-t first:rounded-t-lg last:border-b last:rounded-b-lg overflow-hidden">
            <button
                type="button"
                className={buttonClasses}
                onClick={toggle}
                aria-expanded={isOpened ? 'true' : 'false'}
                aria-controls={id.current}
            >
                <span className="font-semibold">{header}</span>
                <CircleArrow direction={isOpened ? 'up' : 'down'} className={arrowClasses} />
            </button>
            <div id={id.current} className="transition-all duration-700" style={collapsibleStyle}>
                <div ref={collapsible} className="p-6 text-muted-dark text-sm">
                    {body}
                </div>
            </div>
        </div>
    );
}
