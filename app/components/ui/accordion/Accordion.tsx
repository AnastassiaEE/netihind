import AccordionItem from './AccordionItem';
import React from 'react';
import Check from '@/components/ui/icons/Check';

export default function Accordion({ items, t }: { items: { [key: string]: string }[]; t: any }) {
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item);
                return (
                    <AccordionItem
                        key={index}
                        header={t(item[header])}
                        body={t.rich(item[body], {
                            ul: (chunks: React.ReactNode) => <ul>{chunks}</ul>,
                            li: (chunks: React.ReactNode) => <li className="mb-2">{chunks}</li>,
                            i: () => <Check size="small" />,
                        })}
                    ></AccordionItem>
                );
            })}
        </div>
    );
}
