'use client'

import React from "react";
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import DropdownBox from "./DropdownBox";
import IconInput from "./IconInput";

const Searchbar = function Searchbar({
    className,
    data,
    size,
    name,
    placeholder, 
    handleChange, 
    value, 
    isValid,
    error,
    icon
}: {
    className: string,
    data: {[key:string]: any}[],
    size?: 'sm' | 'lg', 
    name?: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    value: string, 
    isValid: boolean,
    error: string,
    icon?: {[key: string]: any}
}) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
    };

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
    
    return (
        <div className={`${className} relative`} ref={searchBarRef}>
            {icon ?
            <IconInput 
                size={size}
                name={name}
                placeholder={placeholder} 
                handleChange={handleChange} 
                value={value} 
                handleFocus={handleFocus}
                isValid={isValid}
                error={error}
                icon={icon}/>
            :
            <Input 
                size={size}
                name={name}
                placeholder={placeholder} 
                handleChange={handleChange} 
                value={value} 
                handleFocus={handleFocus}
                isValid={isValid}
                error={error}/>
            }
            {isFocused && data.length > 0 &&
                <DropdownBox searchbar={searchBarRef.current} data={data} size={size}/> 
            }
        </div>
    )
}
export default Searchbar;