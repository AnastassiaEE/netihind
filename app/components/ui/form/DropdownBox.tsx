'use client'

import { useCallback, useEffect, useState } from "react";

const listItemClasses = 'text-muted-dark cursor-pointer hover:bg-primary/30';
const listAnchorClasses = 'block';

const sizes: {[key: string]: string} = {
    sm: '',
    lg: 'text-base px-4 py-3'
}

export default function DropdownBox({
    searchbar,
    data,
    size = 'sm'
}: {
    searchbar: HTMLElement | null
    data: {[key:string]: any}[]
    size?: string
}) {
    const [heightAndPos, setHeightAndPos] = useState({height: 0, pos: 'down'});

    const getHeightAndPos = useCallback(() => {  
        const inputHeight = searchbar?.offsetHeight ?? 0;
        const spaceAboveSearchbar = (searchbar?.getBoundingClientRect().top ?? 0) - document.getElementsByTagName('header')[0].offsetHeight;
        const spaceUnderSearchbar = window.innerHeight - ((searchbar?.getBoundingClientRect().top ?? 0) + inputHeight);
        if (spaceAboveSearchbar > spaceUnderSearchbar) {
            setHeightAndPos({height: spaceAboveSearchbar - 10, pos: 'up'});
        } else {
            setHeightAndPos({height: spaceUnderSearchbar - 10, pos: 'down'});
        }
    }, [searchbar])

    useEffect(() => {
        getHeightAndPos();
    }, [getHeightAndPos])

    return (
        <div className="bg-white border border-primary/30 rounded-md w-full absolute z-10 overflow-hidden" style={heightAndPos.pos === 'up' ? {bottom: '100%'} : undefined}>
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