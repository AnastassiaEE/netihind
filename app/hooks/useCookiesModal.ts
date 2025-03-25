import { useConsentContext } from '@/context/ConsentContext';
import { useEffect, useState } from 'react';
import useOverlay from './useOverlay';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

const CONSENT_COOKIE_KEY = 'COOKIE_CONSENT';

export default function useCookiesModal() {
  const [preferences, setPreferences] = useState<{
    [key: string]: boolean;
  }>({
    necessary: true,
    statistics: false,
  });
  const { setConsent } = useConsentContext();

  const {
    isOpened: isCookiesModalOpened,
    open: openCookiesModal,
    close: closeCookiesModal,
    overlayRef: cookiesModalRef,
  } = useOverlay(false, false);

  useEffect(() => {
    if (hasCookie(CONSENT_COOKIE_KEY)) {
      const consentCookie = getCookie(CONSENT_COOKIE_KEY);
      if (consentCookie) {
        const preferences = JSON.parse(consentCookie);
        setPreferences(preferences);
        setConsent(preferences);
      }
    } else {
      setConsent(preferences);
      openCookiesModal();
    }
  }, []);

  const togglePreference = (preference: string) => {
    setPreferences((prevState) => ({
      ...prevState,
      [preference]: !prevState[preference],
    }));
  };

  const saveConsentCookie = (preferences: { [key: string]: boolean }) => {
    setCookie(CONSENT_COOKIE_KEY, JSON.stringify(preferences), {
      maxAge: 365 * 24 * 60 * 60,
    });
    closeCookiesModal();
    setConsent(preferences);
  };

  const managePreferences = (action: string) => {
    let newPreferences = { ...preferences };
    switch (action) {
      case 'accept-all':
        newPreferences = Object.fromEntries(
          Object.keys(newPreferences).map((key) => [key, true]),
        );
        break;
      case 'decline-all':
        newPreferences = Object.fromEntries(
          Object.keys(newPreferences).map((key) => [key, key === 'necessary']),
        );
        break;
      default:
        break;
    }
    setPreferences(newPreferences);
    saveConsentCookie(newPreferences);
  };

  return {
    openCookiesModal,
    isCookiesModalOpened,
    cookiesModalRef,
    preferences,
    togglePreference,
    managePreferences,
  };
}
