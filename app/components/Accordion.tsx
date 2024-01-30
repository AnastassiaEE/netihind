'use client'

import { useState } from "react"
import AccordionItem from "./AccordionItem"

export default function Accordion({data}: {data: {[key:string]: string}[]}) {

    const [openedId, setOpenedId] = useState(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const clickedId = (e.target as HTMLButtonElement).closest('button').getAttribute('aria-controls');
        clickedId === openedId ? setOpenedId(null) : setOpenedId(clickedId);
    }
    
    return (
        <div>
            {data.map((d, i) => 
                <AccordionItem
                    key={i}
                    handleClick={handleClick}
                    title={d.title}
                    text={d.text}
                    id={'sect' + i}
                    isOpened={openedId === 'sect' + i}/>
            )}
        </div>
    )
}