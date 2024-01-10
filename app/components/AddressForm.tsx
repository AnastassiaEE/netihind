'use client'

import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { parse } from 'papaparse';


export default function AddressForm() {
    const [addressInput, setAddressInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [selectedApartment, setSelectedApartment] = useState('');
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [filteredApartments, setFilteredApartments] = useState<string[]>([]);
    const [addressApartments, setAddressApartments] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
    const apartmentRegex = /(?<=\-).*$/g;

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
        })
    }

    const delayInput = (filterFunction: () => void, delay: number) => {
        keyupTimer.current && clearTimeout(keyupTimer.current);
        keyupTimer.current = setTimeout(filterFunction, delay);
    } 

    const filterAddresses = () => {
        setIsLoading(true);
        setFilteredAddresses(
            parsedCsvData
            .filter(address => {
                return `${address['LAHIAADRESS'].match(addressRegex)?.[0]}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`.startsWith(addressInput.trim());
            })
        )
    }

    const filterApartments = () => {
        setFilteredApartments(
            addressApartments.filter(apartment => {
                return apartment.startsWith(apartmentInput.trim());
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
      filterApartments();
    }, [apartmentInput])

    useEffect(() => {
        setIsLoading(false);
    }, [filteredAddresses])

    useEffect(() => {
        if (selectedAddress === '') {
            setAddressApartments([]);
      } else {
        setAddressApartments(
            parsedCsvData
            .filter((address) => {
                return address['LAHIAADRESS'].match(new RegExp(`${selectedAddress}-.*`, 'g'))?.[0] ?? '';    
            })
            .map((address) => {
                return address['LAHIAADRESS'].match(apartmentRegex)?.[0] ?? '';
            })   
        )
      }
    }, [selectedAddress])
        
 
    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
        setSelectedAddress('');
    }

    const handleApartmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApartmentInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
        setSelectedApartment('');
    }

    const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAddressInput((e.target as HTMLAnchorElement).innerText.trim());
        setSelectedAddress((e.target as HTMLAnchorElement).getAttribute('data-address') ?? '');
    }

    const handleApartmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setApartmentInput((e.target as HTMLAnchorElement).innerText.trim());
        setSelectedApartment((e.target as HTMLAnchorElement).getAttribute('data-address') ?? '');
    }

    let addressesList;
    if (addressInput.length === 1) {
        addressesList = 'Введите минимум 2 символа';
    } else if (addressInput.length > 1) {
        addressesList = filteredAddresses.map(address => 
            <li key={address['LAHIAADRESS']}>
                <a data-address={address['LAHIAADRESS']} onClick={handleAddressClick}> {address['LAHIAADRESS']}, {address['SIHTNUMBER']}, {address['TAISAADRESS'].split(', ')[1]}, {address['TAISAADRESS'].split(', ')[0]} </a>
            </li>
        )
    }

    return (    
        <>
            <SearchBar 
                placeholder={"Адрес"} 
                handleChange={handleAddressInputChange} 
                inputValue={addressInput}>   
                {isLoading ? '***': addressesList} 
            </SearchBar>
            
            {addressApartments.length > 0 &&
                <SearchBar
                    placeholder={"Номер квартиры"}
                    handleChange={handleApartmentInputChange}
                    inputValue={apartmentInput}>
                    {filteredApartments.map(apartment => 
                    <li key={apartment}>
                        <a data-address={apartment} onClick={handleApartmentClick}> {apartment} </a>
                    </li>
                    )}
                </SearchBar>
            }
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
    
    