import React from "react";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import DropdownBox from "./DropdownBox";

export function Searchbar({
    className,
    data,
    size,
    placeholder, 
    handleChange, 
    inputValue, 
    isInvalid,
    feedback
}: {
    className: string,
    data: {[key:string]: any}[],
    size: string, 
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    isInvalid: boolean,
    feedback: string
}) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
    }

    useEffect(() => {
        const handleClickOutsideSearchbar = (e: MouseEvent) => {
            if(!(searchBarRef.current)?.contains(e.target as Node)) {
                setIsFocused(false);
            }
        }
        window.addEventListener('mousedown', handleClickOutsideSearchbar)
        return () => {
            window.removeEventListener('mousedown', handleClickOutsideSearchbar);
        }
    }, [])
    
    let dropdownHeight = '25vh';
    if (searchBarRef.current !== null) {
        const inputHeight = searchBarRef.current.getElementsByTagName('input')[0].offsetHeight;
        dropdownHeight = window.innerHeight - (searchBarRef.current.offsetTop  + inputHeight + 20) + 'px';
    }

    return (
        <div className={className + " relative"} ref={searchBarRef}>
            <Input  
                size={size}
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={handleFocus}
                isInvalid={isInvalid}
                feedback={feedback}/>
            {isFocused && data.length > 0 &&
                <DropdownBox height={dropdownHeight} data={data} size={size}/> 
            }
        </div>
    )
}