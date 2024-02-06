'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { parse } from 'papaparse';
import Button from "./Button";
import Searchbar from "./Searchbar";


export default function AddressForm() { 
    const [inputs, setInputs] = useState({address: '', apartment: ''});
    const [selected, setSelected] = useState({address: '', apartment: null});
    const [parsedCsvData, setParsedCsvData] = useState<{[key: string]: string}[]>([]);
    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [filteredApartments, setFilteredApartments] = useState<string[]>([]);
    const [addressApartments, setAddressApartments] = useState<string[]>([]);
    const [errors, setErrors] = useState({address: '', apartment: ''});

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
        inputs.address.length > 1 ? delayInput(filterAddresses, 1000) : setFilteredAddresses([]);
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [inputs.address]);

    useEffect(() => {
      inputs.apartment.length > 0 ? filterApartments(): setFilteredApartments([]);
    }, [inputs.apartment])

    useEffect(() => {
        if (selected.address !== '') {
            setAddressApartments(
                parsedCsvData
                .filter(address => address['LAHIAADRESS'].match(new RegExp(`${selected.address}-.*`, 'g'))?.[0])
                .map(address => address['LAHIAADRESS'].match(apartmentRegex)?.[0] ?? '')   
            )
        }
    }, [selected.address])

    useEffect(() => {
        addressApartments.length > 0 ? setSelected({...selected, apartment: ''}): setSelected({...selected, apartment: null});
    }, [addressApartments])
    
    const delayInput = (filterFunction: () => void, delay: number) => {
        keyupTimer.current && clearTimeout(keyupTimer.current);
        keyupTimer.current = setTimeout(filterFunction, delay);
    } 

    const filterAddresses = () => {
        setFilteredAddresses(
            parsedCsvData
            .filter(address => `${address['LAHIAADRESS'].match(addressRegex)?.[0]}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`.startsWith(inputs.address.trim()))
        )
    }

    const filterApartments = () => {
        setFilteredApartments(
            addressApartments
            .filter(apartment => apartment.startsWith(inputs.apartment.trim()))
        )
    }
    
    const closeApartmentField = () => {
        setAddressApartments([]);
        setInputs({...inputs, apartment: ''});
    }

    const handleAddressInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, address: e.target.value.replace(/\s{2,}/g, ' ').trimStart()});  
        if (selected.address !== '') {
            setSelected({...selected, address: ''});
            closeApartmentField();
        }
    }, [inputs.address])

    const handleApartmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, apartment: e.target.value.replace(/\s{2,}/g, ' ').trimStart()});
        setSelected({...selected, apartment: ''});
    }

    const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setInputs({...inputs, address: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, address: (e.target as HTMLAnchorElement).getAttribute('data-search-item') ?? ''});
        setErrors({...errors, address: ''});
    }

    const handleApartmentClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setInputs({...inputs, apartment: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, apartment: (e.target as HTMLAnchorElement).getAttribute('data-search-item') ?? ''})
        setErrors({...errors, apartment: ''});
    }

    const validateForm = () => {
        const {address, apartment} = selected;
        if (inputs.address.length <= 1) {
            setErrors({...errors, address: 'Введите минимум 2 символа'});
            return false;
        } else if (address === '') {
            setErrors({...errors, address: 'Выберите адресс'});
            return false;
        } else if (address !== '' && apartment === '') {
            setErrors({...errors, apartment: 'Выберите квартиру'});
            return false;
        } else if (address !== '' && (apartment !== '' || apartment === null)) {
            return true;
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('form');
        }
    }


    const addresses = filteredAddresses.map(address => ({key: address['LAHIAADRESS'], fn: handleAddressClick, data: `${address['LAHIAADRESS']}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`}))
    const apartments = filteredApartments.map(apartment => ({key: apartment, fn: handleApartmentClick, data: apartment})) 

    return (    
        <form action="" onSubmit={handleSubmit} className="flex flex-wrap items-center gap-x-1.5">
            <Searchbar
                className={"grow basis-auto"}
                data={addresses}
                size="lg"
                name="address"
                placeholder="Адрес"
                handleChange={handleAddressInputChange} 
                value={inputs.address}
                isInvalid={errors.address !== ''}
                error={errors.address}/>   
     
            {selected.apartment !== null &&
                <Searchbar
                    className="basis-3/12 md:basis-2/12"
                    data={apartments}
                    size="lg"
                    name="address"
                    placeholder="Номер квартиры"
                    handleChange={handleApartmentInputChange}
                    value={inputs.apartment}
                    isInvalid={errors.apartment !== ''}
                    error={errors.apartment}/>
            }
            <div className="basis-full mt-3 sm:basis-auto sm:mt-0">
                <Button variant="primary" size="lg"> Найти провайдеров </Button>
            </div>    
        </form>
    )
}
    