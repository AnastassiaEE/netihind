'use client';

import AccordionItem from './AccordionItem';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Check from '@/components/ui/icons/Check';

export default function Accordion({ items }: { items: { [key: string]: any }[] }) {
    const { t } = useTranslation(['home']);
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item)
                return (
                    <AccordionItem
                        key={index}
                        header={t(item[header])}
                        body={
                            <Trans
                                i18nKey={t(item[body])}
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
