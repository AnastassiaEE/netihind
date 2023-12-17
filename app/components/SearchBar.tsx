import { useEffect, useState } from "react";
import Input from "./Input";


export default function SearchBar({placeholder, handleChange, inputValue, children}) {

    const [isFocused, setIsFocused] = useState<boolean>(false);

    const onFocus = (e: FocusEvent) => {
        setIsFocused(!isFocused);
        console.log(isFocused);
    }

    return (
        <>
            <Input placeholder={placeholder} handleCh={handleChange} inputV={inputValue} focus={onFocus}/>
            <ul style={{height: '200px', overflow: 'scroll'}}>
                {children}
            </ul>
            
        </>
    )
}