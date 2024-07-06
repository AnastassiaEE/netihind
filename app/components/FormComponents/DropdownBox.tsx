import { useEffect, useState } from "react";

const listItemClasses = 'text-slate-600 cursor-pointer hover:bg-indigo-500/30';
const listAnchorClasses = 'block';

const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-4 py-3'
}

export default function DropdownBox ({
    searchbar,
    data,
    size = 'sm'
}: {
    searchbar: HTMLElement | null
    data: {[key:string]: any}[]
    size?: string
}) {

    const [heightAndPos, setHeightAndPos] = useState({height: 0, pos: 'down'});

    const getHeightAndPos = () => {  
        if (searchbar !== null) {
            const inputHeight = searchbar.getElementsByTagName('input')[0].offsetHeight;
            const spaceAboveSearchbar = searchbar.getBoundingClientRect().top;
            const spaceUnderSearchbar = window.innerHeight - (searchbar.getBoundingClientRect().top + inputHeight);
            if (spaceAboveSearchbar > spaceUnderSearchbar) {
                setHeightAndPos({height: spaceAboveSearchbar - 10, pos: 'up'});
            } else {
                setHeightAndPos({height: spaceUnderSearchbar - 10, pos: 'down'});
            }
        }
    }

    useEffect(() => {
        getHeightAndPos();
    }, [])

    return (
        <div className="bg-white border border-indigo-500/30 rounded-md w-full absolute z-10 overflow-hidden" style={heightAndPos.pos === 'up' ? {top: `-${heightAndPos.height}px`}: undefined}>
            <ul className="overflow-auto" style={{maxHeight: `${heightAndPos.height}px`}}>
               {data.map(d => 
                    <li key={d.key} className={listItemClasses}>
                        <a data-search-item={d.key} onClick={d.fn} className={`${listAnchorClasses} ${sizes[size]}`}> {d.data} </a>
                    </li>)
                }
            </ul>  
        </div>
    )
}