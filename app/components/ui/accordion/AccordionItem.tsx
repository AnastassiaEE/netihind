'use client'

import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Children, useRef, useState } from "react";

const baseArrowStyle = 
`font-semibold\
 rounded-full\
 flex\
 justify-center\
 shrink-0\
 items-center\
 w-9\
 h-9\
 transition-colors`;

const closedArrowStyle = `bg-neutral-light`;

const openedArrowStyle = 
`bg-primary\
 outline-none\
 shadow-md\
 shadow-primary/50`;

export default function AccordionItem({
    children
}:{
    isOpened?: boolean,
    children: React.ReactNode
}) {

    const [isOpened, setIsOpened] = useState(false);

    const collapsible = useRef<HTMLDivElement | null>(null);
    const ID = useRef(makeid(3));
    
    const question = Children.toArray(children)[0] 
    const answer = Children.toArray(children)[1] 

    function makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    const handleClick = () => {
        setIsOpened(!isOpened);
    }
    
    return (
        <div className="border-x border-b border-muted-light first:border-t first:rounded-t-lg last:border-b last:rounded-b-lg overflow-hidden">
            <button 
                type="button" 
                className={`flex justify-between items-center ${isOpened && "border-b"} w-full p-6`}
                onClick={handleClick}
                aria-expanded={isOpened ? 'true': 'false'}
                aria-controls={ID.current}> 
                <span className="text-base font-semibold">{question}</span>
                <span className={`${isOpened ? openedArrowStyle : closedArrowStyle} ${baseArrowStyle}`}>
                    {isOpened ? <ExpandLess className="text-white"/> : <ExpandMore className="text-black"/>}
                </span>
            </button>
            <div id={ID.current} className={`transition-all duration-700`} style={isOpened ? {'height': `${collapsible.current?.offsetHeight}px`} : {'height': 0}}>
                <div ref={collapsible} className="text-muted-dark text-sm p-6">
                    {answer}
                </div>
            </div> 
        </div>
    )
}