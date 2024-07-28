'use client'

import useBoolean from "../../../hooks/useBoolean";
import { Children, useId, useRef } from "react";
import CircleArrow from '../arrow/CircleArrow';

const closedArrowStyle = `bg-neutral-light`;

const openedArrowStyle = 
`bg-primary\
 outline-none\
 shadow-md\
 shadow-primary/50\
 text-white`;

export default function AccordionItem({children}:{children: React.ReactNode}) {

    const {value: isOpened, toggle} = useBoolean(false);

    const collapsible = useRef<HTMLDivElement | null>(null);
    const id = useRef(useId());

    const [question, answer] = Children.toArray(children)
    
    return (
        <div className="border-x border-b border-muted-light first:border-t first:rounded-t-lg last:border-b last:rounded-b-lg overflow-hidden">
            <button 
                type="button" 
                className={`flex justify-between items-center ${isOpened && "border-b"} w-full p-6`}
                onClick={toggle}
                aria-expanded={isOpened ? 'true': 'false'}
                aria-controls={id.current}> 
                <span className="text-base font-semibold">{question}</span>
                {isOpened ? <CircleArrow direction="up" style={openedArrowStyle}/> : <CircleArrow direction="down" style={closedArrowStyle}/>}
            </button>
            <div id={id.current} className={`transition-all duration-700`} style={isOpened ? {'height': `${collapsible.current?.offsetHeight}px`} : {'height': 0}}>
                <div ref={collapsible} className="text-muted-dark text-sm p-6">
                    {answer}
                </div>
            </div>
        </div>
    )
}