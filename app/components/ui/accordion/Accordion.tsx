import AccordionItem from './AccordionItem';
import React from 'react';
import { Trans } from 'react-i18next/TransWithoutContext';
import Check from '@/components/ui/icons/Check';
import { i18n } from 'i18next';

export default function Accordion({
    items,
    i18n,
}: {
    items: { [key: string]: string }[];
    i18n: i18n;
}) {
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item);
                return (
                    <AccordionItem
                        key={index}
                        header={i18n.t(item[header])}
                        body={
                            <Trans
                                i18nKey={i18n.t(item[body])}
                                t={i18n.t}
                                components={{
                                    ul: <ul />,
                                    li: <li className="mb-2" />,
                                    bullet: <Check size="small" />,
                                }}
                            />
                        }
                    ></AccordionItem>
                );
            })}
        </div>
    );
}
