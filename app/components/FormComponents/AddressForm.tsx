'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { parse } from 'papaparse';
import Button from "./Button";
import Searchbar from "./Searchbar";


export default function AddressForm() { 
    const [inputs, setInputs] = useState({address: '', apartment: ''});
    const [selected, setSelected] = useState({address: '', apartment: ''});
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [errors, setErrors] = useState({address: '', apartment: ''});

    const addressRegex = /^[^\d]*[\d\/A-Za-z]*$/g;
    const apartmentRegex = /(?<=\-).*$/g;
    const keyupTimer = useRef<ReturnType<typeof setTimeout>| null>(null);

    /**
     * Converts a csv file into an array of objects, where each object is an address.
     * @param pathToFile    path to csv file
     * @param delimeter     data delimeter in file lines
     */
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

    /**
     * When the component is initially rendered, the address file is converted into an array of objects.
     */
    useEffect(() => {
        parseCsvFile('addresses.csv', ';');
    }, [])

    /**
     * When the user enters an address:
     *  if the address length is more than 1 character, all addresses are filtered by the entered one (with a delay of 1 second);
     *  if the length is 1 or less, filtered addresses are cleared.
     */
    useEffect(() => {
        inputs.address.length > 1 ? delayInput(filterAddresses, 1000) : setFilteredAddresses([]);
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [inputs.address]);

    /**
     * Сreates a delay before address filtering.
     * This is necessary so that address filtering does not occur every time the user enters a character in the address field.
     * @param filterFunction    callback function for filtering addresses
     * @param delay             delay before address filtering
     */
    const delayInput = (filterFunction: () => void, delay: number) => {
        keyupTimer.current = setTimeout(filterFunction, delay);
    } 

    /**
     * Filters addresses based on the value entered in the address field.
     */
     const filterAddresses = () => {
        setFilteredAddresses(
            parsedCsvData
            .filter(address => `${address['LAHIAADRESS'].match(addressRegex)?.[0]}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`.startsWith(inputs.address.trim()))
        )
    }

    /**
     * Filters selected address apartments based on the value entered in the apartment field.
     */
     const filterApartments = () => {
        return addressApartments?.filter(apartment => apartment.startsWith(inputs.apartment.trim()))
    }

    /**
     * When the user selects an address from the drop-down list:
     *  1) find all address-apartment values ​​based on the selected address;
     *  2) from the found values extract apartment numbers.
     */
    const addressApartments = selected.address === '' ? null :
        parsedCsvData
        .filter(address => address['LAHIAADRESS'].match(new RegExp(`${selected.address}-.*`, 'g'))?.[0])
        .map(address => address['LAHIAADRESS'].match(apartmentRegex)?.[0] ?? '');

     /**
     * When the user enters the apartment number:
     *  if the length of the entered number is at least 1 character, all address apartments are filtered by the entered one;
     *  if the length is 0, filtered apartments are cleared.
     */
     const filteredApartments = inputs.apartment.length > 0 ? filterApartments(): [];
     
    /**
     * Saves the value entered in the address field and deletes selected address.
     */
    const handleAddressInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({address: e.target.value.replace(/\s{2,}/g, ' ').trimStart(), apartment: ''});  
        setSelected({address: '', apartment: ''});
        setErrors({...errors, apartment: ''});
    }, [inputs.address]);

    /**
     * Saves the value entered in the apartment field and deletes selected apartment.
     */
    const handleApartmentInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prevState => ({...prevState, apartment: e.target.value.replace(/\s{2,}/g, ' ').trimStart()}));
        setSelected(prevState => ({...prevState, apartment: ''}));
    }, [inputs.apartment])

    /**
     * Processes a click on an address in a drop-down menu:
     *  1) sets the selected address to the address field;
     *  2) save selected address;
     *  3) clear address field errors.
     * @param e mouse event 
     */
    const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setInputs({...inputs, address: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, address: (e.target as HTMLAnchorElement).getAttribute('data-search-item') ?? ''});
        setErrors({...errors, address: ''});
    }

    /**
     * Handles a click on an apartment in a drop-down menu:
     *  1) sets the selected apartment to the apartment field;
     *  2) save selected apartment;
     *  3) clear apartment field errors.
     * @param e mouse event 
     */
    const handleApartmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setInputs({...inputs, apartment: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, apartment: (e.target as HTMLAnchorElement).getAttribute('data-search-item') ?? ''})
        setErrors({...errors, apartment: ''});
    }

    /**
     * Validates the form and sets corresponding errors.
     * @returns is form validated or not
     */
    const validateForm = () => {
        const {address, apartment} = selected;
        if (inputs.address.length < 2) {
            setErrors({...errors, address: 'Введите минимум 2 символа'});
            return false;
        } else if (address === '') {
            setErrors({...errors, address: 'Выберите адресс'});
            return false;
        } else if (address !== '' && apartment === '' && addressApartments?.length > 0) {
            setErrors({...errors, apartment: 'Выберите квартиру'});
            return false;
        } else if (address !== '' && (apartment !== '' || addressApartments?.length === 0)) {
            return true;
        }
    }

    /**
     * Handles form submission. 
     * @param e form event
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('form');
        }
    }
    
    const getAddresses = () => filteredAddresses.map(address => ({key: address['LAHIAADRESS'], fn: handleAddressClick, data: `${address['LAHIAADRESS']}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`}));
    const getApartments = () => filteredApartments.map(apartment => ({key: apartment, fn: handleApartmentClick, data: apartment}));

    return (    
        <form action="" onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-1.5">
            <Searchbar
                className={"grow basis-auto"}
                data={getAddresses()}
                size="lg"
                name="address"
                placeholder="Адрес"
                handleChange={handleAddressInputChange} 
                value={inputs.address}
                isValid={errors.address === ''}
                error={errors.address}/>   
            {addressApartments?.length > 0 &&
                <Searchbar
                    className="basis-3/12 md:basis-2/12"
                    data={getApartments()}
                    size="lg"
                    name="address"
                    placeholder="Номер квартиры"
                    handleChange={handleApartmentInputChange}
                    value={inputs.apartment}
                    isValid={errors.apartment === ''}
                    error={errors.apartment}/>
            }
            <div className="basis-full mt-3 sm:basis-auto sm:mt-0">
                <Button variant="primary" size="lg"> Найти провайдеров </Button>
            </div>    
        </form>
    )
}
    