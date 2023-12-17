'use client'

import { ReactNode, createContext, useState } from "react";

/*
export const AddressContext = createContext('');

export const AddressProvider = ({children}: {children: ReactNode}) => {
    const [houseInput, setHouseInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState('');
    const [selectedHouse, setSelectedHouse] = useState('');
    const [selectedApartment, setSelectedApartment] = useState('');
    return (
        <AddressContext.Provider value={{
            houseInput,
            setHouseInput,
            apartmentInput,
            setApartmentInput,
            selectedHouse, 
            setSelectedHouse,
            selectedApartment,
            setSelectedApartment
        }}>
        {children}
        </AddressContext.Provider>
    )
}

export const useAddress = () => (AddressContext);
*/