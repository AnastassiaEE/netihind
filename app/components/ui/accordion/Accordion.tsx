import AccordionItem from '@/components/ui/accordion/AccordionItem';
import React, { memo } from 'react';

const AccordionItemMemo = memo(AccordionItem);

export default function Accordion({
    data,
}: {
    data: {
        header: string;
        body: React.ReactNode;
    }[];
}) {
    return (
        <div>
            {data.map(({ header, body }) => (
                <AccordionItemMemo key={header} header={header} body={body} />
            ))}
        </div>
    );
}
