import { useEffect, useRef } from "react";
import useBoolean from "./useBoolean";

export default function useSearcharbar() {
    
    const {value: isFocused , setTrue: setFocused, setFalse: setNotFocused} = useBoolean(false);
    const searchBarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutsideSearchbar = (e: MouseEvent) => {
            if(!(searchBarRef.current)?.contains(e.target as Node)) {
                setNotFocused();
            }
        }
        window.addEventListener('mousedown', handleClickOutsideSearchbar)
        return () => {
            window.removeEventListener('mousedown', handleClickOutsideSearchbar);
        }
    }, [setNotFocused])

    return {
        isFocused,
        setFocused,
        searchBarRef
    }
}