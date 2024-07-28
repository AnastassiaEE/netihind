import AccordionItem from "./AccordionItem";
import React from "react";

export default function Accordion({items}: {items: {[key: string]: string}[]}) {
    return (
        <div>
            {items.map((item, index) => {
                const [header, body] = Object.keys(item)
                return (
                    <AccordionItem key={index}> 
                        <>{item[header]}</>
                        <>{item[body]}</>
                    </AccordionItem>
                )
            })}
        </div>
    )
}