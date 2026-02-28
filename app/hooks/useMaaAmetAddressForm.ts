import { setCookie } from 'cookies-next/client';
import { useLocale } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useEffect, useRef, useState } from 'react';
import { getAddressSlug } from '@/utils/addressHelper';

/**
 * Integrates the Maa-amet InAadress widget and manages address selection flow.
 *
 * This hook dynamically loads the InAadress script, initializes the widget,
 * listens for address selection events, validates the selected address,
 * and navigates to the address results page on submit.
 *
 * It also handles widget-specific DOM cleanup, validation states,
 * and prevents duplicate widget initialization.
 *
 * @param nonce - CSP nonce used for loading the external InAadress script
 * @returns An object containing:
 *  - `isScriptLoaded`: boolean indicating whether the InAadress script has been loaded
 *  - `isLoading`: boolean indicating whether the widget and address form are still initializing
 *  - `handleSubmit`: function to handle form submission
 *  - `handleKeyDown`: function to prevent form submission when pressing Enter inside widget inputs
 *  - `isFormVisible`: function returning boolean whether the address form should be displayed
 *  - `error`: string containing the current validation error key for the form
 */
export default function useMaaAmetAddressForm(nonce: string) {
  const isWidgetAdded = useRef(false);
  const [address, setAddress] = useState({
    full: '',
    oid: '',
    apartment: undefined,
  });
  const [error, setError] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const router = useRouter();

  /**
   * Handles address selection event emitted by the InAadress widget
   * and updates local address state.
   *
   * @param e - The event emitted by the InAadress widget (expected to be a CustomEvent).
   *             The event's `detail` property should contain an array with address info objects
   */
  const getAddress = (e: Event) => {
    var info = (e as CustomEvent).detail[0];
    setAddress((prevAddress) => ({
      ...prevAddress,
      full: info.aadress,
      apartment: info.kort_nr,
    }));
    info.hoone_ads_oid
      ? setAddress((prevAddress) => ({
          ...prevAddress,
          oid: info.hoone_ads_oid,
        }))
      : setAddress((prevAddress) => ({ ...prevAddress, oid: info.ads_oid }));
  };

  /**
   * Clears the currently selected address.
   */
  const removeAddress = () => {
    setAddress({ full: '', oid: '', apartment: undefined });
  };

  /**
   * Removes validation errors and related invalid styles
   * from InAadress input elements.
   */
  const removeErrors = () => {
    document.querySelector('.inads-input')?.classList.remove('invalid');
    document.querySelector('.inads-appartment')?.classList.remove('invalid');
    setError('');
  };

  /**
   * Determines whether the address form can be displayed.
   * The form is shown only after the script is loaded
   * and widget initialization is completed.
   */
  const isFormVisible = () => {
    if (!isScriptLoaded) return false;
    if (isScriptLoaded && isLoading) return false;
    return true;
  };

  /**
   * Validates selected address and apartment (if required).
   * Applies error messages and invalid styles when validation fails.
   */
  const isFormValid = () => {
    const streetInput = document.querySelector('.inads-input');
    const apartmentInput = document.querySelector('.inads-appartment');
    if (address.full === '') {
      setError('errors.emptyAddress');
      streetInput?.classList.add('invalid');
      return false;
    }
    if (
      !apartmentInput?.classList.contains('hidden') &&
      address.apartment === undefined
    ) {
      apartmentInput?.classList.add('invalid');
      setError('errors.emptyApartment');
      return false;
    }
    return true;
  };

  /**
   * Prevents form submission when pressing Enter inside widget inputs.
   *
   * @param e - The keyboard event triggered inside an input element
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  /**
   * Validates the form, stores the selected address in cookies,
   * and navigates to the address results page.
   *
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      const slug = getAddressSlug(address.full);
      setCookie('ADDRESS', JSON.stringify(address));
      router.push({
        pathname: '/address/[slug]',
        params: { slug: slug },
      });
    }
  };

  /**
   * Removes inline styles injected by the InAadress widget
   * to allow full control via application CSS.
   */
  const removeInlineStyles = () => {
    document.querySelectorAll('style').forEach((styleEl) => {
      if (styleEl.textContent && styleEl.textContent.includes('inads')) {
        styleEl.remove();
      }
    });
    document.querySelectorAll('#in-address, #in-address *').forEach((el) => {
      el.removeAttribute('style');
    });
  };

  useEffect(() => {
    const initializeWidget = () => {
      if (isWidgetAdded.current) return;
      if (
        typeof window !== 'undefined' &&
        typeof window.InAadress === 'function'
      ) {
        new window.InAadress({
          container: 'in-address',
          mode: 3,
          ihist: '0',
          appartment: 1,
          lang: locale,
        });
        isWidgetAdded.current = true;
      }
    };

    const script = document.createElement('script');
    script.src =
      'https://inaadress.maaamet.ee/inaadress/js/inaadress.min.js?d=20220510';
    script.setAttribute('nonce', nonce);
    script.onload = () => {
      removeInlineStyles();
      setIsScriptLoaded(true);
      initializeWidget();
      document.addEventListener('addressSelected', getAddress);
      document.addEventListener('addressSelected', removeErrors);
    };
    script.onerror = () => {
      setIsLoading(false);
    };
    document.body.appendChild(script);
    document.addEventListener('inaadressLoaded', () => {
      document
        .querySelector('.inads-input-clear')
        ?.addEventListener('click', removeAddress);
      document
        .querySelector('.inads-input-clear')
        ?.addEventListener('click', removeErrors);
      setIsLoading(false);
    });

    return () => {
      document.body.removeChild(script);
      document.removeEventListener('addressSelected', getAddress);
      document.removeEventListener('addressSelected', removeErrors);
      document
        .querySelector('.inads-input-clear')
        ?.removeEventListener('click', removeAddress);
      document
        .querySelector('.inads-input-clear')
        ?.removeEventListener('click', removeErrors);
    };
  }, [locale, nonce]);

  return {
    isScriptLoaded,
    isLoading,
    handleSubmit,
    handleKeyDown,
    isFormVisible,
    error,
  };
}
