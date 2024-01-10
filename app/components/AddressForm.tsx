'use client'

import SearchBar from "./SearchBar";
import Button from "./Button";
import { useState, useEffect, useRef } from "react";
import { parse } from 'papaparse';


export default function AddressForm() {
    const [addressInput, setAddressInput] = useState('');
    const [apartmentInput, setApartmentInput] = useState('');
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [selectedApartment, setSelectedApartment] = useState<string|null>(null);
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [filteredApartments, setFilteredApartments] = useState<string[]>([]);
    const [addressApartments, setAddressApartments] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddressFeedback, setIsAddressFeedback] = useState(false);
    const [isApartmentFeedback, setIsApartmentFeedback] = useState(false);

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
      apartmentInput.length > 0 ? filterApartments(): setFilteredApartments([]);
    }, [apartmentInput])

    useEffect(() => {
        setIsLoading(false);
    }, [filteredAddresses])

    useEffect(() => {
        if (selectedAddress !== '') {
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

    useEffect(() => {
        addressApartments.length > 0 ? setSelectedApartment(''): setSelectedApartment(null);
    }, [addressApartments])
    
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
            addressApartments
            .filter(apartment => {
                return apartment.startsWith(apartmentInput.trim());
            })
        )
    }
    
    const closeApartmentField = () => {
        setAddressApartments([]);
        setApartmentInput('');
        setIsApartmentFeedback(false);
    }

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
        if (selectedAddress !== '') {
            setSelectedAddress('');
            closeApartmentField();
        }
    }

    const handleApartmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApartmentInput(e.target.value.replace(/\s{2,}/g, ' ').trimStart());  
        setSelectedApartment('');
    }

    const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setAddressInput((e.target as HTMLAnchorElement).innerText.trim());
        setSelectedAddress((e.target as HTMLAnchorElement).getAttribute('data-address') ?? '');
        setIsAddressFeedback(false);
    }

    const handleApartmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setApartmentInput((e.target as HTMLAnchorElement).innerText.trim());
        setSelectedApartment((e.target as HTMLAnchorElement).getAttribute('data-address') ?? '');
        setIsApartmentFeedback(false);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedAddress === '') {
            setIsAddressFeedback(true);
        } else if (selectedAddress !== '' && selectedApartment === null) {
            console.log('form');
        } else if (selectedAddress !== '' && selectedApartment === '') {
            setIsApartmentFeedback(true);
        } else if (selectedAddress !== '' && selectedApartment !== '') {
            console.log('form');
        }
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
        <form action="" onSubmit={onSubmit}>
            <SearchBar 
                placeholder={"Адрес"} 
                handleChange={handleAddressInputChange} 
                inputValue={addressInput}
                isFeedback={isAddressFeedback}
                feedback={"Выберите адресс"}>   
                {isLoading ? '***': addressesList} 
            </SearchBar>
            
            {selectedApartment !== null &&
                <SearchBar
                    placeholder={"Номер квартиры"}
                    handleChange={handleApartmentInputChange}
                    inputValue={apartmentInput}
                    isFeedback={isApartmentFeedback}
                    feedback={"Выберите квартиру"}>
                    {filteredApartments.map(apartment => 
                    <li key={apartment}>
                        <a data-address={apartment} onClick={handleApartmentClick}> {apartment} </a>
                    </li>
                    )}
                </SearchBar>
            }
            <input type="submit" value="Найти провайдеров" />
        </form>
    )
}
    