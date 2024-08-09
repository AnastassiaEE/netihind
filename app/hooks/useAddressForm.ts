import { getAddress, getApartment, removeExtraChars, removeExtraSpaces } from "../utils/addressFormatter";
import { useEffect, useRef, useState } from "react";
import useCsvParser from "./useCsvParser";

export default function useAddressForm() {

    const { data } = useCsvParser('addresses.csv', ';');

    const [values, setValues] = useState({address: '', apartment: ''});
    const [selected, setSelected] = useState({address: '', apartment: ''});

    const [filteredAddresses, setFilteredAddresses] = useState<{[key: string]: string}[]>([]);
    const [errors, setErrors] = useState({address: '', apartment: ''});

    const keyupTimer = useRef<ReturnType<typeof setTimeout>| null>(null);

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
     * When the user enters an address:
     *  if the address length is more than 1 character, all addresses are filtered by the entered one (with a delay of 1 second);
     *  if the length is 1 or less, filtered addresses are cleared.
     */
    useEffect(() => {
        /**
         * Filters addresses based on the value entered in the address field.
         */
        const filterAddresses = () => {
            setFilteredAddresses(
                data
                .filter(address => `${removeExtraChars(getAddress(address['LAHIAADRESS']))}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`.toLowerCase().startsWith(removeExtraChars(values.address).trim().toLowerCase()))
            )
        }

        values.address.length > 1 ? delayInput(filterAddresses, 1000) : setFilteredAddresses([]);
        return() => {
            keyupTimer.current && clearTimeout(keyupTimer.current);
        }
    }, [values.address]);

    /**
     * Filters selected address apartments based on the value entered in the apartment field.
     */
    const filterApartments = () => {
        return allAddressApartments?.filter(apartment => apartment.startsWith(values.apartment.trim()))
    }

    /**
     * Saves the value entered in the address field and deletes selected address.
     */
      const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({address: removeExtraSpaces(e.target.value).trimStart(), apartment: ''});  
        setSelected({address: '', apartment: ''});
        setErrors({...errors, apartment: ''});
    };

    /**
     * Saves the value entered in the apartment field and deletes selected apartment.
     */
    const handleApartmentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues(prevState => ({...prevState, apartment: removeExtraSpaces(e.target.value).trimStart()}));
        setSelected(prevState => ({...prevState, apartment: ''}));
    }
    
    /**
     * Processes a click on an address in a drop-down menu:
     *  1) sets the selected address to the address field;
     *  2) save selected address;
     *  3) clear address field errors.
     * @param e mouse event 
     */
    const handleAddressClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setValues({...values, address: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, address: (e.target as HTMLAnchorElement).getAttribute('data-search-item')?.split(',')[0] ?? ''});
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
        setValues({...values, apartment: (e.target as HTMLAnchorElement).innerText.trim()});
        setSelected({...selected, apartment: (e.target as HTMLAnchorElement).getAttribute('data-search-item') ?? ''})
        setErrors({...errors, apartment: ''});
    }

     /**
     * Cleares address field.
     */
     const removeAddress = () => {
        setValues({address: '', apartment: ''});
        setSelected({address: '', apartment: ''});
        setErrors({address: '', apartment: ''});
    }


    const addresses = filteredAddresses.map(address => (`${address['LAHIAADRESS']}, ${address['SIHTNUMBER']}, ${address['TAISAADRESS'].split(', ')[1]}, ${address['TAISAADRESS'].split(', ')[0]}`));

    /**
     * When the user selects an address from the drop-down list:
     *  1) find all address-apartment values ​​based on the selected address;
     *  2) from the found values extract apartment numbers.
     */
    const allAddressApartments = selected.address === '' ? [] :
        data
        .filter(address => address['LAHIAADRESS'].match(new RegExp(`${selected.address}-.*`, 'g'))?.[0])
        .map(address => getApartment(address['LAHIAADRESS']) ?? '');

    
    /**
     * When the user enters the apartment number:
     *  if the length of the entered number is at least 1 character, all address apartments are filtered by the entered one;
     *  if the length is 0, filtered apartments are cleared.
     */
    const apartments = values.apartment.length > 0 ? filterApartments(): [];

    /**
     * Validates the form and sets corresponding errors.
     * @returns is form validated or not
     */
    const validateForm = () => {
        const {address, apartment} = selected;
        if (values.address.length < 2) {
            setErrors({...errors, address: 'Введите минимум 2 символа'});
            return false;
        } else if (address === '') {
            setErrors({...errors, address: 'Выберите адрес'});
            return false;
        } else if (address !== '' && apartment === '' && allAddressApartments.length > 0) {
            setErrors({...errors, apartment: 'Выберите квартиру'});
            return false;
        } else if (address !== '' && (apartment !== '' || allAddressApartments.length === 0)) {
            return true;
        }
    }

    /**
     * Handles form submission. 
     * @param e form event
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('form');
        }
    }

    return {
        addresses, 
        allAddressApartments,
        apartments,
        values,
        errors,
        handleAddressInputChange,
        handleApartmentInputChange,
        handleAddressClick, 
        handleApartmentClick,
        removeAddress,
        handleSubmit
    }
}