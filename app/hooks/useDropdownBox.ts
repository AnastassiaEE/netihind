import { useEffect, useState } from "react";

export default function useDropdownBox(searchbar: HTMLElement | null) {
    const [heightAndPos, setHeightAndPos] = useState({height: 0, pos: 'down'});

    const getHeightAndPos = () => {  
        const inputHeight = searchbar?.offsetHeight ?? 0;
        const spaceAboveSearchbar = (searchbar?.getBoundingClientRect().top ?? 0) - document.getElementsByTagName('header')[0].offsetHeight;
        const spaceUnderSearchbar = window.innerHeight - ((searchbar?.getBoundingClientRect().top ?? 0) + inputHeight);
        if (spaceAboveSearchbar > spaceUnderSearchbar) {
            setHeightAndPos({height: spaceAboveSearchbar - 10, pos: 'up'});
        } else {
            setHeightAndPos({height: spaceUnderSearchbar - 10, pos: 'down'});
        }
    }

    useEffect(() => {
        getHeightAndPos();
    }, [])

    return {heightAndPos}
} 