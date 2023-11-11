'use client'

import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect, useRef, SetStateAction } from "react";
import Papa from 'papaparse';


export default function AddressForm() {
    const [houseInput, setHouseInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState(null);
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isButtonActive, setIsButtonActive] = useState(false);
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredHouses, setFilteredHouses] = useState<{[key: string]: string}[]>([]);

    const houseReg = /^[^\d]*[\d\/A-Za-z]*$/g;
    const apartmentReg = /(?<=\-)\d*$/g;

    const keyupTimer = useRef<ReturnType<typeof setTimeout>| null>(null);

    const parseCsvFile = (pathToFile: string, delimeter: string) => {
        Papa.parse(pathToFile, {
            download: true,
            header: true,
            delimeter: delimeter,
            skipEmptyLines: true,
            complete: function(result: { data: {[key: string]: string}[]}) {
                setParsedCsvData(result.data);   
                console.log(result);
            }
        }); 
    }

    const delayInput = (filterFunction: () => void, delay: number) => {
        keyupTimer.current && clearTimeout(keyupTimer.current);
        keyupTimer.current = setTimeout(filterFunction, delay);
    } 

    const filterHouses = () => {
        setFilteredHouses(
            parsedCsvData
            .filter((address) => {
                return address['LAHIAADRESS'].match(houseReg)?.[0].startsWith(houseInput);
            })
        )
    }

    useEffect(() => {
        parseCsvFile('/addresses.csv', ';');

        const date1 = new Date("1996-04-05:00:00.000Z");
        console.log(date1.toLocaleString())
    }, [])

    useEffect(() => {
        if (houseInput.length > 1) {
            delayInput(filterHouses, 1000);
        }
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [houseInput]);
    

    
    useEffect(() => {
        console.log(filteredHouses);
       
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
        */
    }, [filteredHouses])
    
    
    const handleHouseInputChange = (value: string) => {
        setHouseInput(value.replace(/\s{2,}/g, ' ').trimStart());  
    }
    

    return (    
        <>
            <SearchBar 
                placeholder={"Адрес"} 
                handleChange={handleHouseInputChange} 
                inputValue={houseInput}>

                {houseInput.length > 1 && filteredHouses.map(house => 
                    <li key={house['LAHIAADRESS']}> 
                        {house['LAHIAADRESS']}, {house['SIHTNUMBER']}, {house['TAISAADRESS'].split(', ')[1]}, {house['TAISAADRESS'].split(', ')[0]}
                    </li>
                )}
                    
            </SearchBar>
            
            <Button active={false}> Найти провайдеров </Button> 
        </>
    )
}