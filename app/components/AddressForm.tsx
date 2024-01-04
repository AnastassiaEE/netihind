'use client'

import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { parse, ParseResult } from 'papaparse';


export default function AddressForm() {
    const [houseInput, setHouseInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredHouses, setFilteredHouses] = useState<{[key: string]: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const houseReg = /^[^\d]*[\d\/A-Za-z]*$/g;
    const apartmentReg = /(?<=\-)\d*$/g;

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

    const filterHouses = () => {
        setIsLoading(true);
        setFilteredHouses(
            parsedCsvData
            .filter((address) => {
                return address['LAHIAADRESS'].match(houseReg)?.[0].startsWith(houseInput);
            })
        )
    }


    useEffect(() => {
        parseCsvFile('/addresses.csv', ';');
    }, [])

    useEffect(() => {
        if (houseInput.length > 1) {
            delayInput(filterHouses, 1000);
        } else {
            setFilteredHouses([]);
        }
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [houseInput]);
    

    useEffect(() => {
        setIsLoading(false);
    }, [filteredHouses])
    

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
    
    
    const handleHouseInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHouseInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
    }

    let housesList;
    if (houseInput.length === 1) {
        housesList = 'Введите минимум 2 символа';
    } else if (houseInput.length > 1) {
        housesList = filteredHouses.map(house => 
            <li key={house['LAHIAADRESS']}> 
                {house['LAHIAADRESS']}, {house['SIHTNUMBER']}, {house['TAISAADRESS'].split(', ')[1]}, {house['TAISAADRESS'].split(', ')[0]} 
            </li>)
    }

    return (    
        <>
            <SearchBar 
                placeholder={"Адрес"} 
                handleChange={handleHouseInputChange} 
                inputValue={houseInput}>   
                {isLoading ? '***': housesList}    
            </SearchBar>
            
            <Button active={false}> Найти провайдеров </Button> 
        </>
    )
}