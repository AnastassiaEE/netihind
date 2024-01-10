'use client'
import { ReactNode, useEffect, useRef, useState } from "react";
import Input from "./Input";
import React from "react";


export default function SearchBar({
    placeholder, 
    handleChange, 
    inputValue, 
    children,
    isFeedback,
    feedback
}: {
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    children: ReactNode,
    isFeedback: boolean,
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
    
    return (
        <div className="search-bar" ref={searchBarRef}>
            <Input  
                className="search-bar__input"
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={handleFocus}
                isFeedback={isFeedback}
                feedback={feedback}/>

            {isFocused && React.Children.count(children) > 0 &&
                <ul style={{maxHeight: '200px', overflow: 'scroll'}}>
                    {children}
                </ul> 
            }
        </div>
    )
}