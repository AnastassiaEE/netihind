import { ReactNode, useEffect, useState } from "react";
import Input from "./Input";


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

    const onFocus = () => {
        setIsFocused(!isFocused);
        console.log(isFocused);
    }

    return (
        <>
            <Input placeholder={placeholder} handleChange={handleChange} inputValue={inputValue} handleFocus={onFocus}/>
            <ul style={{height: '200px', overflow: 'scroll'}}>
                {children}
            </ul>
            
        </>
    )
}