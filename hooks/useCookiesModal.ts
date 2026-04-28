import { useConsentContext } from '@/context/ConsentContext';
import { useEffect, useState } from 'react';
import useOverlay from '@/hooks/useOverlay';
import { getCookie, hasCookie, setCookie } from 'cookies-next/client';

const CONSENT_COOKIE_KEY = 'COOKIE_CONSENT';

/**
 * Get user's initial consent preferences from cookie.
 *
 * @returns Initial preferences,
 *   defaulting to `{ necessary: true, statistics: false }` if no valid cookie
 */
const getInitialPreferences = (): Record<string, boolean> => {
  if (hasCookie(CONSENT_COOKIE_KEY)) {
    const consentCookie = getCookie(CONSENT_COOKIE_KEY);
    if (consentCookie) {
      try {
        return JSON.parse(consentCookie);
      } catch {
        // Fallback if parsing fails
      }
    }
  }
  return {
    necessary: true,
    statistics: false,
  };
};

/**
 * Manages cookie consent modal state and user preferences.
 *
 * This hook:
 * - Initializes consent state from cookies
 * - Opens the cookie modal if no consent is stored
 * - Allows toggling individual preferences
 * - Saves consent to cookies and updates global consent context
 *
 * Intended for GDPR-compliant cookie consent handling.
 *
 * @returns An object containing:
 *  - `openCookiesModal`: function to open the cookie consent modal
 *  - `isCookiesModalMounted`: boolean indicating if the modal component is mounted in the DOM
 *  - `isCookiesModalVisible`: boolean indicating if the modal is currently visible
 *  - `cookiesModalRef`: ref object to attach to the modal overlay
 *  - `preferences`: object representing current cookie preferences (key = preference name, value = boolean)
 *  - `togglePreference`: function to toggle a single cookie preference
 *  - `managePreferences`: function to apply predefined consent actions to all preferences
 */
export default function useCookiesModal() {
  /**
   * Stores current cookie preferences.
   * "necessary" is always enabled by default.
   */
  const [preferences, setPreferences] = useState(getInitialPreferences);
  const { setConsent } = useConsentContext();

  const {
    isMounted: isCookiesModalMounted,
    isVisible: isCookiesModalVisible,
    open: openCookiesModal,
    close: closeCookiesModal,
    overlayRef: cookiesModalRef,
  } = useOverlay(false, false);

  /**
   * Initialize consent state on mount:
   * - Update global consent context with current preferences
   * - Open modal if no consent cookie exists
   */
  useEffect(() => {
    setConsent(preferences);
    if (!hasCookie(CONSENT_COOKIE_KEY)) {
      openCookiesModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Toggles a single cookie preference.
   *
   * @param preference - The key of the cookie preference to toggle
   */
  const togglePreference = (preference: string) => {
    setPreferences((prevState) => ({
      ...prevState,
      [preference]: !prevState[preference],
    }));
  };

  /**
   * Persists consent preferences in cookies and updates global state.
   *
   * @param preferences - Object representing consent preferences (key = preference name, value = true/false)
   */
  const saveConsentCookie = (preferences: Record<string, boolean>) => {
    setCookie(CONSENT_COOKIE_KEY, JSON.stringify(preferences), {
      maxAge: 365 * 24 * 60 * 60,
    });
    closeCookiesModal();
    setConsent(preferences);
  };

  /**
   * Applies predefined consent actions (accept all / decline all) to all preferences.
   *
   * @param action - The action to apply. Supported values:
   *   - `accept-all`: marks all preferences as true
   *   - `decline-all`: marks all preferences as false, except 'necessary' which remains true
   */
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
    isCookiesModalMounted,
    isCookiesModalVisible,
    cookiesModalRef,
    preferences,
    togglePreference,
    managePreferences,
  };
}
