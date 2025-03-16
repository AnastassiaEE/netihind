'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import CookieButton from '@/components/ui/cookies/CookieButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/form/buttons/Button';

export default function CookieConsent() {
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
            {c.rich('consent', {
              p: (chunks: React.ReactNode) => <p className="mb-3">{chunks}</p>,
              strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
              a: (chunks: React.ReactNode) => (
                <a
                  href="/policy"
                  target="_blank"
                  className="font-semibold transition-colors hover:text-primary"
                >
                  {chunks}
                </a>
              ),
            })}
            <div className="flex">
              <Button>Keeldu</Button>
              <Button>Luba kõik</Button>
            </div>
          </TabPanel>
          <TabPanel> Content 2</TabPanel>
          <TabPanel> Content 3</TabPanel>
        </Tabs>
      </Dialogue>
    </>
  );
}
