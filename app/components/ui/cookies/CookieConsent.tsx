'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import CookieButton from '@/components/ui/cookies/CookieButton';
import Dialogue from '@/components/ui/overlay/Dialog';
import useOverlay from '@/hooks/useOverlay';
import Tabs from '@/components/ui/tabs/Tabs';
import TabPanel from '@/components/ui/tabs/TabPanel';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/form/buttons/Button';
import Accordion from '../accordion/Accordion';
import AccordionItem from '../accordion/AccordionItem';
import AccordionItemHeader from '../accordion/AccordionItemHeader';
import AccordionItemBody from '../accordion/AccordionItemBody';
import ToggleSwitch from '../form/fields/toggle/ToggleSwitch';

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
            <Accordion border="bottom" size="md" arrowPosition="left">
              <AccordionItem>
                <AccordionItemHeader>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-black">Vajalik</p>
                      <ToggleSwitch
                        name={''}
                        size="lg"
                        isChecked={false}
                        handleChange={function (
                          event: ChangeEvent<HTMLInputElement>,
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    </div>
                    <p>
                      Vajalikud küpsised võimaldavad meie veebilehe
                      põhifunktsioonide toimimise, ilma nendeta leht ei tööta.
                    </p>
                  </div>
                </AccordionItemHeader>
                <AccordionItemBody>rwfwefwfff</AccordionItemBody>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeader>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="font-semibold text-black">Eelistused</p>
                      <ToggleSwitch
                        name={''}
                        size="lg"
                        isChecked={false}
                        handleChange={function (
                          event: ChangeEvent<HTMLInputElement>,
                        ): void {
                          throw new Error('Function not implemented.');
                        }}
                      />
                    </div>
                    <p>
                      Eelistuste küpsised aitavad meil meeles pidada Teie kui
                      kasutaja eelistusi meie veebilehte külastades, salvestades
                      Teie kasutajaeelistusi, näiteks kasutajanimi, keelevalik
                      jms. Eelistuste küpsised on vajalikud, muutmaks meie
                      veebilehte kasutajamugavamaks.
                    </p>
                  </div>
                </AccordionItemHeader>
                <AccordionItemBody>rwfwefwfff</AccordionItemBody>
              </AccordionItem>
            </Accordion>
          </TabPanel>
          <TabPanel> Content 3</TabPanel>
        </Tabs>
      </Dialogue>
    </>
  );
}
