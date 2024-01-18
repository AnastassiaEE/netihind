'use client'
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import classNames from 'classnames';
import dropdownMenuStyles from '../styles/DropdownMenu.module.css';
import React from "react";


export default function SearchBar({
    className,
    placeholder, 
    handleChange, 
    inputValue, 
    children,
    isFeedback,
    feedback
}: {
    className: string,
    placeholder: string, 
    handleChange: React.ChangeEventHandler<HTMLInputElement>, 
    inputValue: string, 
    children: React.ReactNode,
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
        <div className={classNames(className, "relative")} ref={searchBarRef}>
            <Input  
                className=""
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={handleFocus}
                isFeedback={isFeedback}
                feedback={feedback}/>

            {isFocused && React.Children.count(children) > 0 &&
                <ul className={classNames(dropdownMenuStyles.menu, "absolute w-full top-[120%]")}>
                    {React.Children.map(children, child => {
                        return React.cloneElement(child as React.ReactElement, {className: dropdownMenuStyles.item })
                    })}
                    
                </ul> 
            }
        </div>
    )
}