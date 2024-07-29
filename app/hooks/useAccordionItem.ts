'use client' 

import { useId, useRef } from "react";
import useBoolean from "./useBoolean";

export default function useAccordionItem() {
    const {value: isOpened, toggle} = useBoolean(false);
    const collapsible = useRef<HTMLDivElement | null>(null);
    const id = useRef(useId());

    return {
        isOpened, 
        toggle,
        collapsible,
        id
    }
}