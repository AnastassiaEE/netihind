'use client'

import { ReactNode, createContext, useState } from "react";

export const AddressContext = createContext<{
    selected: {address: string; apartment: string},
    setSelected: React.Dispatch<React.SetStateAction<{address: string; apartment: string}>>
} | null>(null);

export const AddressProvider = ({children}: {children: ReactNode}) => {
    const [selected, setSelected] = useState({address: '', apartment: ''});
    return (
        <AddressContext.Provider value={{
            selected,
            setSelected
        }}>
            {children}
        </AddressContext.Provider>
    )
}
