'use client';

import { useEffect, useState } from 'react';
import CookiesButton from '@/components/ui/cookies/CookiesButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import CookiesConsentSection from '@/components/ui/cookies/CookiesConsentSection';
import CookiesDetailsSection from '@/components/ui/cookies/CookiesDetailsSection';
import CookiesActions from '@/components/ui/cookies/CookiesActions';
import CookiesInfoSection from '@/components/ui/cookies/CookiesInfoSection';
import { getCookie, hasCookie, setCookie } from 'cookies-next';

export default function CookiesModal() {
  const b = useTranslations('Buttons');
  const c = useTranslations('Cookies');
  const tabs = [c('tabs.consent'), c('tabs.details'), c('tabs.info')];
  const COOKIE_KEY = 'COOKIE_CONSENT';
  const [preferences, setPreferences] = useState<{
    [key: string]: boolean;
  }>({
    necessary: true,
    statistics: false,
  });

  const {
    isOpened: isCookiesModalOpened,
    open: openCookiesModal,
    close: closeCookiesModal,
    overlayRef: cookiesModalRef,
  } = useOverlay(false, false);

  useEffect(() => {
    if (hasCookie(COOKIE_KEY)) {
      const preferencesCookie = getCookie(COOKIE_KEY);
      if (preferencesCookie) setPreferences(JSON.parse(preferencesCookie));
    } else {
      openCookiesModal();
    }
  }, []);

  const togglePreference = (preference: string) => {
    setPreferences((prevState) => ({
      ...prevState,
      [preference]: !prevState[preference],
    }));
  };

  const savePreferencesCookie = (cookies: { [key: string]: boolean }) => {
    setCookie(COOKIE_KEY, JSON.stringify(cookies), {
      maxAge: 365 * 24 * 60 * 60,
    });
    closeCookiesModal();
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
    savePreferencesCookie(newPreferences);
  };

  return (
    <>
      <CookiesButton label={b('cookies.open')} handleClick={openCookiesModal} />
      <Dialogue
        type="modal"
        name="cookies"
        title={c('title')}
        isOpened={isCookiesModalOpened}
        dialogRef={cookiesModalRef}
        className="flex flex-col overflow-hidden bg-white"
      >
        <Tabs name="cookies" tabs={tabs}>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesConsentSection />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesDetailsSection
              preferences={preferences}
              togglePreference={togglePreference}
            />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesInfoSection />
          </TabPanel>
        </Tabs>
        <CookiesActions
          managePreferences={managePreferences}
          className="mt-3"
        />
      </Dialogue>
    </>
  );
}
