import { Libraries, useLoadScript } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { setCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';

const libraries: Libraries = ['places'];

export default function UseGoogleAddressForm() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_API_KEY as string,
    libraries,
    language: 'et',
  });
  const [selected, setSelected] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState('');

  const disableEnterPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (!isLoaded || loadError) return;

    const options = {
      componentRestrictions: { country: 'ee' },
      fields: ['formatted_address'],
    };

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement,
      options,
    );

    autocomplete.addListener('place_changed', () => handlePlaceChanged(autocomplete));
    //return () => autocomplete.removeListener("place_changed", handlePlaceChanged);
  }, [isLoaded, loadError]);

  useEffect(() => {
    formRef.current?.addEventListener('keypress', disableEnterPress);
  }, []);

  const setAddressCookie = (selectedAddress: string) => {
    setCookie('ADDRESS', selectedAddress);
  };

  const handlePlaceChanged = async (address: google.maps.places.Autocomplete) => {
    if (!isLoaded) return;
    const place = address.getPlace();
    if (!place) {
      setSelected(null);
      return;
    }
    formData(place);
    setError('');
  };

  const formData = (data: google.maps.places.PlaceResult) => {
    const formattedAddress = data?.formatted_address;
    if (formattedAddress === undefined) {
      setSelected(null);
      return;
    }
    setSelected(formattedAddress);
  };

  const handleDelete = () => {
    (inputRef.current as HTMLInputElement).value = '';
    setSelected(null);
  };

  const handleChange = () => {
    setSelected(null);
  };

  /**
   * Validates the form and sets corresponding errors.
   * @returns is form validated or not
   */
  const validateForm = () => {
    if (selected === null) {
      setError('address.errors.invalid-address');
      return false;
    }
    setError('');
    return true;
  };

  /**
   * Handles form submission.
   * @param e form event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setAddressCookie(selected as string);
      router.push(
        `${i18n.language}/aadress/${encodeURIComponent(selected as string).replace(/\./g, '')}`,
      );
    }
  };

  return {
    formRef,
    inputRef,
    error,
    handleChange,
    handleDelete,
    handleSubmit,
  };
}
