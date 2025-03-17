'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import CookieButton from '@/components/ui/cookies/CookieButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/form/buttons/Button';
import CookiesConsent from '@/components/ui/cookies/CookiesConsent';
import CookiesDetails from './CookiesDetails';
import CookiesActions from './CookiesActions';

export default function CookiesModal() {
  const b = useTranslations('Buttons');
  const c = useTranslations('Cookies');
  const tabs = [c('tabs.consent'), c('tabs.details'), c('tabs.info')];
  const {
    isOpened: isCookiesModalOpened,
    open: openCookiesModal,
    close: closeCookiesModal,
    overlayRef: cookiesModalRef,
  } = useOverlay(true);

  // useEffect(() => {
  //     const consent = localStorage.getItem('cookieConsent');
  //     if (!consent) {
  //         setIsVisible(true);
  //     }
  // }, []);

  // const acceptCookies = () => {
  //     localStorage.setItem('cookieConsent', 'true');
  //     setIsVisible(false);
  // };

  // if (!isVisible) return null;

  const [cookies, setCookies] = useState<{
    [key: string]: boolean;
  }>({
    necessary: true,
    preferences: false,
  });
  const handleCookieChange = (cookieType: string) => {
    setCookies((prevState) => ({
      ...prevState,
      [cookieType]: !prevState[cookieType],
    }));
  };

  return (
    <>
      <CookieButton label={b('cookies.open')} handleClick={openCookiesModal} />
      <Dialogue
        type="modal"
        name="cookies"
        title={c('title')}
        isOpened={isCookiesModalOpened}
        handleClose={closeCookiesModal}
        dialogRef={cookiesModalRef}
        className="flex flex-col overflow-hidden bg-white"
      >
        <Tabs name="cookies" tabs={tabs}>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesConsent />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto">
            <CookiesDetails
              cookies={cookies}
              handleCookieChange={handleCookieChange}
            />
          </TabPanel>
          <TabPanel className="h-auto overflow-y-auto"> Content 3</TabPanel>
        </Tabs>
        <CookiesActions />
      </Dialogue>
    </>
  );
}
