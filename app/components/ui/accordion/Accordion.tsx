import AccordionItem from '@/components/ui/accordion/AccordionItem';
import React, { memo } from 'react';

const AccordionItemMemo = memo(AccordionItem);
export type AccordionVariant = 'outlined' | 'solid';
export type AccordionFontStyles = { header?: string; body?: string };

export default function Accordion({
    data,
    variant = 'outlined',
    isCollapsed = true,
    fontStyles = {
        body: 'text-sm text-muted-dark',
    },
}: {
    data: {
        header: string;
        body: React.ReactNode;
    }[];
    variant?: AccordionVariant;
    isCollapsed?: boolean;
    fontStyles?: AccordionFontStyles;
}) {
    return (
        <div>
            {data.map(({ header, body }) => (
                <AccordionItemMemo
                    key={header}
                    variant={variant}
                    header={header}
                    body={body}
                    isCollapsed={isCollapsed}
                    fontStyles={fontStyles}
                />
            ))}
        </div>
    );
}
