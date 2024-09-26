'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api';
import Input from './fields/Input';
import Button from './buttons/Button';
import { getRandomValues } from 'crypto';

const libraries: Libraries = ['places'];

export default function GoogleAddressForm() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
        libraries,
    });

    const [input, setInput] = useState({});
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isLoaded || loadError) return;

        const options = {
            componentRestrictions: { country: 'ee' },
            fields: ['address_components']
        };

        const autocomplete = new google.maps.places.Autocomplete(inputRef.current as HTMLInputElement, options);
        autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));

        //return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
    }, [isLoaded, loadError]);

    const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
        if (!isLoaded) return;
        const place = address.getPlace();
        if (!place) {
            setInput({});
            return;
        }
        formData(place);
    };

    const formData = (data: google.maps.places.PlaceResult) => {
        const addressComponents = data?.address_components;

        const componentMap: { [key: string]: string } = {
            subPremise: '',
            premise: '',
            route: '',
            street_number: '',
            country: '',
            locality: '',
            postal_code: '',
            administrative_area_level_1: '',
        };
        if (addressComponents === undefined) {
            setInput({})
            return;
        }

        for (const component of addressComponents) {
            const componentType = component.types[0];
            if (componentMap.hasOwnProperty(componentType)) {
                componentMap[componentType] = component.long_name;
            }
        }

        const formattedAddress =
            `${componentMap.subPremise} ${componentMap.premise} ${componentMap.route} ${componentMap.street_number}`.trim();
        setInput((values) => ({
            ...values,
            streetAddress: formattedAddress,
            country: componentMap.country,
            city: componentMap.locality,
            postalCode: componentMap.postal_code,
            state: componentMap.administrative_area_level_1,
        }));
    };

    return (
        <form onSubmit={() => ''} className="flex flex-wrap items-center gap-x-1.5">
            <div className="grow basis-auto">
                <Input size="lg" name="address" isValid={true} ref={inputRef} placeholder="Введите адрес" />
            </div>
            <Button type="submit" size="lg" className="basis-full sm:basis-auto">
                Otsi pakkujaid
            </Button>
        </form>
    );
}
