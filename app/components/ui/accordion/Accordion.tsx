'use client'

import AccordionItem from "./AccordionItem";
import React from "react";
import { Trans, useTranslation } from "react-i18next";
import CheckIcon from '@mui/icons-material/Check';

export default function Accordion({items}: {items: {[key: string]: string}[]}) {
    const { t } = useTranslation();
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item)
                return (
                    <AccordionItem key={index}> 
                        <>{t(item[header])}</>
                        <Trans i18nKey={t(item[body])} components={{ul: <ul/>, li: <li/>, bullet: <CheckIcon fontSize="small" className="text-primary mr-1.5"/>}}>
                            {t(item[body])}
                        </Trans>     
                    </AccordionItem>
                )
            })}
        </div>
    )
}