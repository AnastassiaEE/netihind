import { ReactNode, useEffect, useState } from "react";
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

    const handleFocus = (focustState: boolean) => {
        focustState ? setIsFocused(true) : setIsFocused(false);
    }

    return (
        <>
            <Input 
                placeholder={placeholder} 
                handleChange={handleChange} 
                inputValue={inputValue} 
                handleFocus={() => handleFocus(true)}
                handleBlur={() => handleFocus(false)}/>

            {isFocused && React.Children.count(children) > 0 &&
                <ul style={{maxHeight: '200px', overflow: 'scroll'}}>
                    {children}
                </ul> 
            }
        </>
    )
}