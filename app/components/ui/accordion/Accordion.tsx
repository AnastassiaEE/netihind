'use client'

import AccordionItem from "@/components/ui/accordion/AccordionItem";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Accordion({items}: {items: {[key: string]: string}[]}) {
    const { t } = useTranslation();
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item)
                return (
                    <AccordionItem key={index}> 
                        <>{t(item[header])}</>
                        <>{t(item[body])}</>
                    </AccordionItem>
                )
            })}
        </div>
    )
}