import { useRef } from "react";
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';

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

const closedArrowStyle = `bg-indigo-50`;

const openedArrowStyle = 
`bg-indigo-500\
 outline-none\
 shadow-md\
 shadow-indigo-500/50`;


export default function AccordionItem({
    title,
    text,
    handleClick,
    isOpened,
    id
}:{
    title: string,
    text: string
    handleClick: React.MouseEventHandler<HTMLButtonElement|HTMLDivElement>
    isOpened: boolean,
    id: string
}) {
    const collapsible = useRef(null);
    
    return (
        <div className="border-x border-b border-slate-200 first:border-t first:rounded-t-lg last:border-b last:rounded-b-lg overflow-hidden">
            <button 
                type="button" 
                className={`flex justify-between items-center ${isOpened && "border-b"} w-full p-6`}
                onClick={handleClick}
                aria-expanded={isOpened ? 'true': 'false'}
                aria-controls={id}> 
                <span className="text-base font-semibold">{title}</span>
                <span className={`${isOpened ? openedArrowStyle: closedArrowStyle} ${baseArrowStyle}`}>
                    {isOpened ? <ExpandLess sx={{color: 'white'}}/> : <ExpandMore sx={{color: 'black'}}/>}
                </span>
            </button>
            <div id={id} className={`transition-all duration-700`} style={isOpened ? {'height': `${collapsible.current.offsetHeight}px`} : {'height': 0}}>
                <div ref={collapsible} className="text-slate-600 text-sm p-6">
                    {text}
                </div>
                
            </div>
            
        </div>
    )
}