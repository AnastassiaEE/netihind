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

export default function CookiesModal() {
  const b = useTranslations('Buttons');
  const c = useTranslations('Cookies');
  const tabs = [c('tabs.consent'), c('tabs.details'), c('tabs.info')];
  const {
    isOpened: isCookiesOpened,
    open: openCookies,
    close: closeCookies,
    overlayRef: cookiesRef,
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
    preferenced: false,
  });
  const handleCookieChange = (cookieType: string) => {
    setCookies((prevState) => ({
      ...prevState,
      [cookieType]: !prevState[cookieType],
    }));
  };

  return (
    <>
      <CookieButton label={b('cookies.open')} handleClick={openCookies} />
      <Dialogue
        type="modal"
        name="cookies"
        title={c('title')}
        isOpened={isCookiesOpened}
        handleClose={closeCookies}
        dialogRef={cookiesRef}
        className="bg-white"
      >
        <Tabs name="cookies" tabs={tabs}>
          <TabPanel>
            <CookiesConsent />
            <div className="flex gap-3">
              <Button variant="outlined" size="lg" className="w-full">
                Keeldu
              </Button>
              <Button variant="outlined" size="lg" className="w-full">
                Luba valik
              </Button>
              <Button size="lg" className="w-full">
                Luba kõik
              </Button>
            </div>
          </TabPanel>
          <TabPanel>
            <CookiesDetails
              cookies={cookies}
              handleCookieChange={handleCookieChange}
            />
          </TabPanel>
          <TabPanel> Content 3</TabPanel>
        </Tabs>
      </Dialogue>
    </>
  );
}
