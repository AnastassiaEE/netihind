'use client'

import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { parse } from 'papaparse';


export default function AddressForm() {
    const [addressInput, setAddressInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
    const apartmentRegex = /(?<=\-)\d*$/g;

    const keyupTimer = useRef<ReturnType<typeof setTimeout>| null>(null);


    const parseCsvFile = (pathToFile: string, delimeter: string) => {
        parse(pathToFile, {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: delimeter,
            complete: (result: { data: {[key: string]: string}[]}) => {
                setParsedCsvData(result.data);   

            }
        }); 
    }

    const delayInput = (filterFunction: () => void, delay: number) => {
        keyupTimer.current && clearTimeout(keyupTimer.current);
        keyupTimer.current = setTimeout(filterFunction, delay);
    } 

    const filterAddresses = () => {
        setIsLoading(true);
        setFilteredAddresses(
            parsedCsvData
            .filter((address) => {
                return address['LAHIAADRESS'].match(addressRegex)?.[0].startsWith(addressInput);
            })
        )
    }

    useEffect(() => {
        parseCsvFile('addresses.csv', ';');
    }, [])

    useEffect(() => {
        addressInput.length > 1 ? delayInput(filterAddresses, 1000) : setFilteredAddresses([]);
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [addressInput]);
    

    useEffect(() => {
        setIsLoading(false);
    }, [filteredAddresses])
    

 
    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
        
    }

    const handleAddressClick = (e: React.MouseEvent<HTMLLIElement>) => {
        let clickedAddress = e.target;
        console.log(clickedAddress);

    }

    let addressesList;
    if (addressInput.length === 1) {
        addressesList = 'Введите минимум 2 символа';
    } else if (addressInput.length > 1) {
        addressesList = filteredAddresses.map(address => 
            <li 
                key={address['LAHIAADRESS']}
                onClick={handleAddressClick}> 
                {address['LAHIAADRESS']}, {address['SIHTNUMBER']}, {address['TAISAADRESS'].split(', ')[1]}, {address['TAISAADRESS'].split(', ')[0]} 
            </li>)
    }

    return (    
        <>
            <SearchBar 
                placeholder={"Адрес"} 
                handleChange={handleAddressInputChange} 
                inputValue={addressInput}>   
                {isLoading ? '***': addressesList}    
            </SearchBar>
            
            <Button active={false}> Найти провайдеров </Button> 
        </>
    )
}



   /*
    useEffect(() => {
        console.log(parsedCsvData);
       
        /*
        const data = filteredAddresses.reduce((result, add) => {
            const key = add['LAHIAADRESS'].match(/^.+(?=\-)|^.+/g)[0];
            return {
                ...result,
                [key]:  [...(result?.[key] ?? []), 
                            add['LAHIAADRESS'].match(/(?<=\-)\d*$/g)?.[0] ?? '']
            }
            }, {})
        console.log(data);
        
    }, [parsedCsvData])
    */
    
    