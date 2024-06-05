import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import DropdownBox from "./DropdownBox";

export default function Searchbar({
    className,
    data,
    size,
    name,
    placeholder, 
    handleChange, 
    value, 
    isValid,
    error
}: {
    className: string,
    data: {[key:string]: any}[],
    size?: 'sm' | 'lg', 
    name?: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    value: string, 
    isValid: boolean,
    error: string
}) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, [isFocused]);

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
        dropdownHeight = window.innerHeight - ((searchBarRef.current?.offsetParent as HTMLElement)?.offsetTop + searchBarRef.current?.offsetTop + inputHeight + 20) + 'px';
    }
    
    return (
        <div className={`${className} relative`} ref={searchBarRef}>
            <Input 
                size={size}
                name={name}
                placeholder={placeholder} 
                handleChange={handleChange} 
                value={value} 
                handleFocus={handleFocus}
                isValid={isValid}
                error={error}/>
            {isFocused && data.length > 0 &&
                <DropdownBox height={dropdownHeight} data={data} size={size}/> 
            }
        </div>
    )
}