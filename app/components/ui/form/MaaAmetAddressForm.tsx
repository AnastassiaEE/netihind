'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/form/buttons/Button';
import '../../../styles/addressForm.css';
import FieldError from './FieldError';
import PingLoader from '../loaders/PingLoader';

export default function MaaAmetAddressForm({ locale }: { locale: string }) {
    const isWidgetAdded = useRef(false);
    const [address, setAddress] = useState({ full: '', streetNr: '', apartment: undefined });
    const [error, setError] = useState('');
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const initializeWidget = () => {
        if (isWidgetAdded.current) return;
        if (typeof window !== 'undefined' && typeof window.InAadress === 'function') {
            const widget = new window.InAadress({
                container: 'in-address',
                mode: 3,
                ihist: '0',
                appartment: 1,
                lang: locale,
            });
            isWidgetAdded.current = true;
        }
    };

    const getAddress = (e: Event) => {
        var info = (e as CustomEvent).detail[0];
        setAddress({ full: info.aadress, streetNr: info.aadress_nr, apartment: info.kort_nr });
    };

    const removeAddress = () => {
        setAddress({ full: '', streetNr: '', apartment: undefined });
    };

    const removeErrors = () => {
        document.querySelector('.inads-input')?.classList.remove('invalid');
        document.querySelector('.inads-appartment')?.classList.remove('invalid');
        setError('');
    };

    const isFormVisible = () => {
        if (!isScriptLoaded) return false;
        if (isScriptLoaded && isLoading) return false;
        return true;
    }

    const isFormValid = () => {
        const streetInput = document.querySelector('.inads-input');
        const apartmentInput = document.querySelector('.inads-appartment');
        if (address.full === '') {
            setError('Выберите адрес');
            streetInput?.classList.add('invalid');
            return false;
        }
        if (address.streetNr === '') {
            setError('Выберите корректный адрес');
            streetInput?.classList.add('invalid');
            return false;
        }
        if (!apartmentInput?.classList.contains('hidden') && address.apartment === undefined) {
            apartmentInput?.classList.add('invalid');
            setError('Выберите квартиру');
            return false;
        }
        return true;
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isFormValid());
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://inaadress.maaamet.ee/inaadress/js/inaadress.min.js?d=20220510';
        script.onload = () => {
            setIsScriptLoaded(true);
            initializeWidget();
            document.addEventListener('addressSelected', getAddress);
            document.addEventListener('addressSelected', removeErrors);
        };
        script.onerror = () => {
            setIsLoading(false);
        }
        document.body.appendChild(script);
        document.addEventListener('inaadressLoaded', () => {
            document.querySelector('.inads-input-clear')?.addEventListener('click', removeAddress);
            document.querySelector('.inads-input-clear')?.addEventListener('click', removeErrors);
            setIsLoading(false);
        });

        return () => {
            document.body.removeChild(script);
            document.removeEventListener('addressSelected', getAddress);
            document.removeEventListener('addressSelected', removeErrors);
            document.querySelector('.inads-input-clear')?.removeEventListener('click', removeAddress);
            document.querySelector('.inads-input-clear')?.removeEventListener('click', removeErrors);
        };
    }, []);

    return (
        <>
            {!isScriptLoaded && isLoading && <PingLoader sizeClass='w-10 h-10' />}
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className={isFormVisible() ? 'visible' : 'invisible'}>
                <div className="md:flex gap-1 relative">
                    <div className="grow">
                        <div id="in-address"></div>
                        <FieldError size="lg">{error}</FieldError>
                    </div>

                    <Button type="submit" size="lg" className="max-md:w-full max-md:mt-6">
                        {'address.buttons.find'}
                    </Button>

                </div>
            </form>
        </>
    );
}
