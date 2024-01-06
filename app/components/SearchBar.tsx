'use client'
import { ReactNode, useEffect, useRef, useState } from "react";
import Input from "./Input";
import React from "react";


export default function SearchBar({
    placeholder, 
    handleChange, 
    inputValue, 
    children
}: {
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    children: ReactNode
}) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const searchBarRef = useRef<HTMLDivElement>(null);

    const handleFocus = () => {
        setIsFocused(true);
    }

    useEffect(() => {
        const handleClickOutsideSearhbar = (e: MouseEvent) => {
            if(!(searchBarRef.current)?.contains(e.target as Node)) {
                setIsFocused(false);
            }
        }
        window.addEventListener('click', handleClickOutsideSearhbar)
        return () => {
            window.removeEventListener('click', handleClickOutsideSearhbar);
        }
    }, [])
    
    return (
        <div className="search-bar" ref={searchBarRef}>
            <Input  
                className="search-bar__input"
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={handleFocus}/>

            {isFocused && React.Children.count(children) > 0 &&
                <ul style={{maxHeight: '200px', overflow: 'scroll'}}>
                    {children}
                </ul> 
            }
        </div>
    )
}