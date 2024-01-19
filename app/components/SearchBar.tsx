'use client'
import { useEffect, useRef, useState } from "react";
import Input from "./Input";
import classNames from 'classnames';
import dropdownMenuStyles from '../styles/DropdownMenu.module.css';
import React from "react";


export default function SearchBar({
    className,
    size,
    placeholder, 
    handleChange, 
    inputValue, 
    children,
    isFeedback,
    feedback
}: {
    className: string,
    size: string,
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

    let dropdownHeight = '25vh';
    if (searchBarRef.current !== null) {
        const inputHeight = searchBarRef.current.getElementsByTagName('input')[0].offsetHeight;
        dropdownHeight = window.innerHeight - (searchBarRef.current.offsetTop  + inputHeight + 20) + 'px';
    }

    return (
        <div className={classNames(className, "relative")} ref={searchBarRef}>
            <Input  
                size={size}
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={handleFocus}
                isFeedback={isFeedback}
                feedback={feedback}/>
            {isFocused && React.Children.count(children) > 0 &&
                <div className="w-full absolute rounded-md overflow-hidden" style={{top:'calc(100% + 10px)'}}>
                    <ul className="bg-white border-indigo-500/30 overflow-auto" style={{maxHeight: `${dropdownHeight}`}}>
                        {React.Children.map(children, child => {
                            return React.cloneElement(child as React.ReactElement, {className: dropdownMenuStyles.item})
                        })}
                    </ul>  
                </div>
            }
        </div>
    )
}